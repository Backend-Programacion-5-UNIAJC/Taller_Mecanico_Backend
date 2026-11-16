import { PrismaClient, Role, OrderStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Mecánicos: email es único, por eso upsert (no duplica si el seed corre dos veces)
  const data = [
    { name: 'Mario Gómez', email: 'mario@taller.com', specialty: 'Motor y Transmisión' },
    { name: 'Luis Rodríguez', email: 'luis@taller.com', specialty: 'Frenos y Suspensión' },
    { name: 'Carlos Pérez', email: 'carlos@taller.com', specialty: 'Electricidad Automotriz' },
  ];
  
  // En orden (no en paralelo) para que los ids sean predecibles: Mario 1, Luis 2, Carlos 3.
  const creados = [];
  for (const m of data) {
    creados.push(await prisma.mechanic.upsert({ where: { email: m.email }, update: {}, create: m }));
  }
  const [mario, luis, carlos] = creados;

  // 2. Vehículos: solo si la tabla está vacía (sin ids manuales)
  if ((await prisma.vehicle.count()) === 0) {
    await prisma.vehicle.createMany({
      data: [
        { plate: 'ABC-123', brand: 'Renault', model: 'Duster 2014', ownerName: 'Ana Torres' },
        { plate: 'XYZ-789', brand: 'Chevrolet', model: 'Aveo 2012', ownerName: 'Pedro Picapiedra' },
        { plate: 'MNO-456', brand: 'Mazda', model: '3 2018', ownerName: 'Sofia Vergara' },
        { plate: 'JKL-999', brand: 'Toyota', model: 'Hilux 2020', ownerName: 'Carlos Administrador' },
      ],
    });
  }

  // 3. Órdenes de Servicio de ejemplo vinculadas a un vehículo y un mecánico
  const vehiculoDuster = await prisma.vehicle.findFirstOrThrow({ where: { plate: 'ABC-123' } });
  
  // Usamos upsert simulando una combinación única o validando si ya existe por descripción/vehículo
  const ordenExistente = await prisma.serviceOrder.findFirst({
    where: { vehicleId: vehiculoDuster.id, description: 'Mantenimiento preventivo, cambio de aceite y filtros.' }
  });

  if (!ordenExistente) {
    await prisma.serviceOrder.create({
      data: {
        vehicleId: vehiculoDuster.id,
        mechanicId: mario.id,
        description: 'Mantenimiento preventivo, cambio de aceite y filtros.',
        status: OrderStatus.IN_PROGRESS,
      },
    });
  }

  // 4. Cuentas para iniciar sesión (contraseña de prueba: Clave123*).
  //    Se guarda el hash, nunca el texto. Los MECHANIC quedan vinculados a su perfil de mecánico.
  const cuentas = [
    { name: 'Administrador', email: 'admin@taller.com', role: 'ADMIN' as const, mechanicId: null },
    { name: 'Mario Gómez', email: 'mario.user@taller.com', role: 'MECHANIC' as const, mechanicId: mario.id },
    { name: 'Luis Rodríguez', email: 'luis.user@taller.com', role: 'MECHANIC' as const, mechanicId: luis.id },
    { name: 'Ana Torres (Cliente)', email: 'ana@cliente.com', role: 'CLIENT' as const, mechanicId: null },
  ];

  for (const c of cuentas) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      // Un hash por cuenta: aunque la contraseña sea la misma, el salt hace que cada hash sea distinto.
      create: { name: c.name, email: c.email, password: await bcrypt.hash('Clave123*', 10), role: c.role },
    });
    
    if (c.mechanicId) {
      await prisma.mechanic.update({ where: { id: c.mechanicId }, data: { userId: user.id } });
    }
  }

  console.log('Seed del Taller Mecánico completado con éxito.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());