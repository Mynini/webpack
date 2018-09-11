var path = require("path");
// 1、引入ExtractTextWebpackPlugin
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: "./1.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "dist/",
        filename: '[name].bundle.js',
        chunkFilename: "[name]js" // 指定打包文件的块名称
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({ // 2、使用ExtractTextWebpackPlugin
                    fallback: { // 不提取的时候，使用什么样的配置来处理css
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [ //提取的时候，继续用下面的方式处理
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {　　　　　　
                test: /\.(png|jpg)$/,
                //loader: 'url-loader?limit=8192';
                use: [{
                    loader: 'url-loader',
                    options: {
                        // limit: 10000,
                        name: 'img/[name].[ext]'
                    }
                }]
                // 　　　　　　
                　　　　
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({ //3、 在plugins中配置属性
            filename: '[name].min.css' // 配置提取出来的css名称
        })
    ]
}


// 参考文件
//https://blog.csdn.net/u010982507/article/details/81337529

// 遇到的错误
// 安装:npm install extract-text-webpack-plugin --save-dev  
// 错误提示:Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
// 原因:这个版本中还不能支持webpack4.0.0以上的版本，所以就需要安装webpack4.0以下的版本或者是安装extract-text-webpack-plugin4.0以上的版本。 
// 解决方法:npm install extract-text-webpack-plugin@next --save-dev，会下载到4.0版本