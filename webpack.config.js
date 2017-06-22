

module.exports = {
    //entry root Javascript file
    entry: './app.js',


    //output
    output: {
        //directory name
        // path: 'build',

        filename: 'bundle.js'
    },

    module: {

        //our react app should transpile JSX to JS and ES6 to ES5
        loaders: [
            {
                //regular expr match all files for *.js
                test: /\.js$/,
                //set exclude for node_modules
                exclude: /node_modules/,
                //run files through babel-loader
                loader: 'babel-loader',
            }
        ]
    }
};