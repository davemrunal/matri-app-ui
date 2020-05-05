export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        //REGION: 'US East (N. Virginia)',
        REGION: 'us-east-1',
        BUCKET: 'matri-profile-uploads'
    },
    apiGateway: {
        REGION: 'us-east-1',
        URL: 'https://1vplfdsj15.execute-api.us-east-1.amazonaws.com/prod'
    },
    cognito: {
        REGION: 'us-east-1',
        USER_POOL_ID: 'us-east-1_S1MW8vlAh',
        APP_CLIENT_ID: '6ggta6404tomvv3bljqiban5jl',
        IDENTITY_POOL_ID: 'us-east-1:74d80f23-3b02-41d1-a822-81ff939122ec'
    }
};