export default {
    mongoUrl:
        process.env.MONGO_URL ||
        'mongodb+srv://cleancode:rVklC2Xv31jvujJI@cluster0.2x4mx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'ts4932mfsdnl',
};
