//Error esperado de la api: trae el codigo HTTP y un codigo interno estable.
//Todo lo que No sea un APPError se trata como un error inesperado(500).

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}