const app=require('./src/app');
const connectDB=require('./src/db/db');

connectDB();

app.listen(7000,async()=>{
    console.log('Server is running on port 7000');
});