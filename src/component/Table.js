import React from "react";
import ReactDOM from "react-dom";
import Date from "../data/ShowData";
import Previmg from "../imgs/leftarrow.png";
import Nextimg from "../imgs/rightarrow.png";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slide:this.props.slide,
            show: this.props.show,
            nowclick:0,
            nowposleft:"",
            prevbtn:false,
            nextbtn:true,
            col:3,
            row:3,
            nowtd:24
        }
    }

    onClick = (e) =>{
        let now =Math.floor(e.currentTarget.getAttribute('id') / 7);
        let now2 =e.currentTarget.getAttribute('id') % 7;
        console.log(now,now2);

        this.setState({
            col:now,
            row:now2,
            nowtd:e.currentTarget.getAttribute('id') 
        })
    }

    Nextbtn =() =>{
        let slide = this.state.slide,
            now=this.state.nowclick,
            show=this.props.show,
            classmove,
            nextbtn;
            
            //移動表格
            if((now+slide+show) <= 7){
                now= now +slide;
            }else{
                now =now + (7-now-show);
            }
            classmove= "slider"+slide+"-"+now;

            //按鈕
            if((now + show ) == 7){
                nextbtn=false;
            }else{
                nextbtn=true;
            }

            this.setState({
                nowclick:now,
                nowposleft:classmove,
                prevbtn:true,
                nextbtn:nextbtn
            })
        
    }

    Prevbtn =() =>{
        let slide = this.state.slide,
            now=this.state.nowclick,
            classmove,
            prevbtn;
            //移動表格
            if((now-slide) <= 0){
                now= 0;
            }else{
                now  = now - slide;
            }
            //按鈕
            if(now == 0){
                prevbtn=false;
            }else{
                prevbtn=true;
            }
        classmove= "slider"+slide+"-"+now;  

        this.setState({
            nowclick:now,
            nowposleft:classmove,
            prevbtn:prevbtn,
            nextbtn:true
        })
    }


    render(){
        const ShowData = Date.data; 
        let colnumber = this.props.show ;
        let speed=this.props.speed;
        let pos =this.state.nowposleft;
        let prevbtn = this.state.prevbtn === true ? "":"disn" ,
            nextbtn = this.state.nextbtn === true ? "":"disn";

        return(
            <div className={`th_list col${colnumber}` }>
                <a className={`prevbtn ${prevbtn}` } href="javascript:;" onClick={this.Prevbtn}>
                    <img src={Previmg}/>
                </a>    
                <header>    
                    <ul>
                        <li>
                            <p>回程
                                <span>去程</span>
                            </p>
                        </li>  
                        {ShowData.map((item, i) => {
                        let newyear;
                        if(item.date == "01/01 (一)"){
                           newyear="2018"
                        }
                        return (
                            <li key={i} >
                                 <span className="smallg">{newyear}</span>
                                <span>
                                {
                                    item.data[i].date_tripStart
                                    }
                                </span>
                            </li>
                        );
                    })}
                    </ul>
                </header>
                <table className={pos} style={{ transition: speed + 's' }}>
                    <thead>
                        <tr>
                            {ShowData.map((item, i) => { 
                                let newyear;
                                 if(item.date == "01/01 (一)"){
                                    newyear="2018"
                                 }
                                return (
                                    <th key={i}>
                                        <span className="smallg">{newyear}</span>
                                        {item.date}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                    {ShowData.map((item, i) => {
                        let  tripStart = item.data;
                        return (
                            <tr key={i}>
                                   {
                                    tripStart.map((item2,j)=>{
                                        let idtd =i*7+j,
                                            coltd =Math.floor(idtd/7 ),
                                            rowtd = idtd%7,
                                            coloron,
                                            pricetxt;
                                        // 行列選取
                                        if(this.state.col == coltd || this.state.row == rowtd ){
                                            coloron="on";
                                        }
                                        //價格判斷
                                       if(item2.price == "查看" ||item2.price ==" 一 一 " ){
                                            pricetxt=item2.price
                                       }else{
                                            pricetxt="$"+item2.price+"起"
                                       }
                                       //指定哪格
                                       let clickbtn = this.state.nowtd == idtd? "now":"";
                                       //是否最便宜
                                       let arrowicon = item2.isTheCheapest == true ? 'arrow':'disn';

                                       return(
                                           <td className={`${coloron} ${clickbtn}` } key={j} id={idtd} onClick={this.onClick}>
                                             <span className={`${arrowicon}`}>最便宜</span>
                                              {pricetxt}
                                           </td>
                                       );
                                    })
                                   }
                            </tr> 
                        );
                    })}
                    </tbody>
                </table>
                <a className={`nextbtn ${nextbtn}` } href="javascript:;" onClick={this.Nextbtn}>
                    <img src={ Nextimg}/>
                </a>
                </div>
        )
    }
}

export default Table;