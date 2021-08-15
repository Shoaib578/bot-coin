import React from 'react'
import {
    View,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Text,
    Image,
    LogBox,
    Alert,
    Dimensions,
  ActivityIndicator

  } from "react-native";
import Axios from 'axios'
import base_url from './base_url'
import { LineChart } from "react-native-svg-charts";


export default class ViewHomeCoin extends React.Component {
     state = {
     
     is_loading:true,
     coin:{
        "rank":"",
        "price":"",
        "symbol":"",
        "changePercent":"",
        "change_percentage_of_24hr" : "",
        "change_percentage_of_1hr" : "",
        "change_percentage_of_7days" : "",
        "change_percentage_of_30days" : "",
        "change_percentage_of_60days" : "",
        "change_percentage_of_90days" :"",
      },
    }


    getcoins = async()=>{
      await Axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=60c07164-25a2-4fe5-ac38-685e07d675b7&symbol=${this.props.route.params.coin}`)
        .then(res=>{
          const data = res.data.data
          if(this.props.route.params.coin == "BTC"){
            this.setState({coin:{
                "rank":data.BTC.cmc_rank,
                "price":data.BTC.quote.USD.price.toFixed(5),
                "symbol":data.BTC.symbol,
                "changePercent":data.BTC.quote.USD.percent_change_24h.toFixed(5),
                "change_percentage_of_24hr" : data.BTC.quote.USD.percent_change_24h,
                "change_percentage_of_1hr" : data.BTC.quote.USD.percent_change_1h,
                "change_percentage_of_7days" : data.BTC.quote.USD.percent_change_7d,
                "change_percentage_of_30days" : data.BTC.quote.USD.percent_change_30d,
                "change_percentage_of_60days" :data.BTC.quote.USD.percent_change_60d,
                "change_percentage_of_90days" :data.BTC.quote.USD.percent_change_90d,
              },is_loading:false})

          }else if(this.props.route.params.coin == "BNB"){
            this.setState({coin:{
                "rank":data.BNB.cmc_rank,
                "price":data.BNB.quote.USD.price.toFixed(5),
                "symbol":data.BNB.symbol,
                "changePercent":data.BNB.quote.USD.percent_change_24h.toFixed(5),
                "change_percentage_of_24hr" : data.BNB.quote.USD.percent_change_24h,
                "change_percentage_of_1hr" : data.BNB.quote.USD.percent_change_1h,
                "change_percentage_of_7days" : data.BNB.quote.USD.percent_change_7d,
                "change_percentage_of_30days" : data.BNB.quote.USD.percent_change_30d,
                "change_percentage_of_60days" :data.BNB.quote.USD.percent_change_60d,
                "change_percentage_of_90days" :data.BNB.quote.USD.percent_change_90d,
              },is_loading:false})

          }else if(this.props.route.params.coin == "FEED")
          this.setState({coin:{
            "rank":data.FEED.cmc_rank,
            "price":data.FEED.quote.USD.price.toFixed(5),
            "symbol":data.FEED.symbol,
            "changePercent":data.FEED.quote.USD.percent_change_24h.toFixed(5),
            "change_percentage_of_24hr" : data.FEED.quote.USD.percent_change_24h,
            "change_percentage_of_1hr" : data.FEED.quote.USD.percent_change_1h,
            "change_percentage_of_7days" : data.FEED.quote.USD.percent_change_7d,
            "change_percentage_of_30days" : data.FEED.quote.USD.percent_change_30d,
            "change_percentage_of_60days" :data.FEED.quote.USD.percent_change_60d,
            "change_percentage_of_90days" :data.FEED.quote.USD.percent_change_90d,
          },is_loading:false})
          
        })
        .catch(err=>{
          console.log(err)
        })
      }
      
      componentDidMount(){
          this.getcoins()
      }

  
    render(){
     
        if(!this.state.is_loading){

        if(this.state.coin){



        return (
            <View style={styles.container}>
            <View style={{width:Dimensions.get('window').width,marginTop:20,padding:30,height:'47%'}}>
            <View style={{flexDirection: 'row'}}>
            
            <View style={{borderColor:'gray',borderWidth:1,backgroundColor:'gray',borderRadius:200,justifyContent:'center',alignItems: 'center',padding:8,width:60,height:60}}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>{this.state.coin.symbol?this.state.coin.symbol.substring(0,1):null}</Text>

            </View>
            
            <Text style={{color:'white',fontSize:20,left:10,top:10}}>{this.state.coin.symbol}/USD</Text>
            <Text style={{ fontSize: 23,color:'white',left:'90%',top:5}}>rank # {this.state.coin.rank}</Text>
            
            </View>
            <LineChart
           data={[this.state.coin.change_percentage_of_90days,this.state.coin.change_percentage_of_60days,this.state.coin.change_percentage_of_30days,this.state.coin.change_percentage_of_7days,this.state.coin.change_percentage_of_24hr,this.state.coin.change_percentage_of_1hr]}
           style={styles.chart}
           svg={{ stroke: '#FF00FF', strokeWidth: 3 }}
         />
            <View style={{flexDirection: 'row',marginTop:16,justifyContent: 'space-between'}}>
            <Text style={{color:'white',fontSize:16,color:'#FF00FF'}}>{this.state.coin.change_percentage_of_24hr}%</Text>

            <Text style={{color:'white',fontSize:16,color:'#FF00FF'}}>${this.state.coin.price}</Text>
            </View>

            </View>
            </View>
        )
      }else{
        return <View style={{backgroundColor:'#282c34',flex:1,justifyContent:'center',alignItems: 'center'}}>
        <Text style={{color:'red',fontSize:20}}>Sorry,Could'nt Found Any Coin</Text>
        </View>
      }
      

    }else{
      return(
        <View style={{alignItems: 'center',backgroundColor:"#282c34",flex:1}}>
      <ActivityIndicator color='#FF00FF' size='large' style={{marginTop:50}} />
        </View>
      )
    }

    


    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#282c34",
      flex: 1,
   
    },
    inputStyle: {
      width: "100%",
      //marginBottom: 15,
      //paddingBottom: 15,
      marginHorizontal: 20,
      paddingVertical: 10,
      paddingLeft: 10,
      alignSelf: "center",
      borderColor: "grey",
      borderWidth: 1,
      borderRadius: 20,
      paddingRight: 20,
      fontSize: 20,
      marginVertical: 10,
      // placeholderTextColor: "#FFF",
      // backgroundColor: "#282c34",
      backgroundColor: "#383c4a",
      color: "#FFF",
      height: 50
    },
    chart: {
      height: 75,
      marginTop:20,
      backgroundColor: "#282c34"
    },
    inputView: {
      marginHorizontal: 10
    }
  });