exports.errorHandler = (err, req, res, next)=>{
    console.log('Error Handler');
    console.error(err); 
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
  
    res.status(500).json({ error: 'Internal Server Error' });
}