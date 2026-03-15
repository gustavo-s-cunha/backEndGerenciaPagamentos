export function errorHandler(err:any, req:any, res:any, next:any){
  return res.status(err.status || 500).json({
    error: err.message
  })
}