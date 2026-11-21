export const config = {
    port : Number(process.env.PORT ?? 3000),
    dataFile : process.env.DATA_FILE ?? 'data/tasks.json'
}