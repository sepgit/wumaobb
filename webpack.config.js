module.exports = {
  entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public/weixin",//打包后的文件存放的地方
    filename: "bundle.js",//打包后输出文件的文件名
    publicPath:""
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: "./public/weixin",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    disableHostCheck: true,
    host: '192.168.16.184',
    port:5330,
    inline: true//实时刷新
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.svg/,
        use: ['file-loader']
      },
      {
        test : /\.jpg$/,
        use: ['file-loader']
      }
    ]
  }
};
