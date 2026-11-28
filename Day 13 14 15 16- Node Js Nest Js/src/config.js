export const config = {
    port : Number(process.env.PORT ?? 3000),
    dataFile : process.env.DATA_FILE ?? 'data/tasks.json',
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
}