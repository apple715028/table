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
            col:3,
            row:3,
            nowtd:24
        }
        
    }
    componentDidMount(){
        window.addEventListener("resize", this.updateDimensions);
    }
    updateDimensions=()=> {
        if(document.body.clientWidth < 720){
            let pos = this.state.nowposleft;
            document.querySelector('table').setAttribute('class',pos);
        }else{
            document.querySelector('table').setAttribute('class',"");
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
        let move = this.state.slide,
            now=this.state.nowclick,
            classmove,
            maxtd,//最大
            addmov,//移動幾格
            $table = document.querySelector('table')
            
        //     switch(move) {
        //         case 1:
        //             maxtd =6; 
        //             addmov=1;
        //            break;
        //         case 2:
        //             maxtd =5;
        //             addmov=1;
        //            break;
        //         case 3:
        //             maxtd =6;
        //             addmov=3;
        //            break;
        //         case 4:
        //             maxtd =3;
        //             addmov=3;
        //            break;
        //         // default:
        //         //    默认代码块
        //    } 
         
            maxtd =move ==2? "5": Math.floor( 7 / move) ; //可以點幾次
            switch(move) {
                case 1:
                    maxtd =6; 
                    break;
                case 2:
                    maxtd =5;
                    break;
                default:
                    maxtd = Math.floor( 7 / move) ;
            } 
            
            addmov =move; 
            console.log(maxtd,now);
            now=now+1;
            if(now < maxtd){
                // now =now + addmov;
               
                classmove = "slider"+move+"-"+now;
                $table.setAttribute("class",classmove);
                document.querySelector('.prevbtn').classList.remove("disn");
                // console.log(now);
            }else{
                // maxtd
                now=maxtd;
                classmove = "slider"+move+"-"+ now;
                $table.setAttribute("class",classmove); 
                document.querySelector('.nextbtn').classList.add("disn");
                // console.log("stop",maxtd)
            }

            this.setState({
                nowclick:now,
                nowposleft:classmove
            })
        // let move = this.state.slide-1 ,
        //     now =this.state.nowclick,
        //     tdw =document.querySelector('td').offsetWidth,
        //     posleft,
        //     clicklimit =Math.floor( 7 / move)-1 ,
        //     maxleft= (clicklimit + 1) *tdw;
        //     // console.log(maxleft,"max");
        //     // console.log(now, clicklimit,"limit");

        //     if(now < clicklimit){
        //         now = move + now -1 ;
        //         posleft =tdw*now;
        //         // console.log(posleft);
        //         console.log(now,"btn next");
        //         document.querySelector('.prevbtn').classList.remove("disn");
        //     }else{
        //         now =clicklimit;
        //         posleft=maxleft;
        //         console.log(clicklimit,"btn next");
        //         document.querySelector('.nextbtn').classList.add("disn");
        //     }
        //     this.setState({
        //         nowclick:now,
        //         nowposleft:posleft

        //     })
        //     let movepos =document.querySelector('table').setAttribute('style','margin-left:'+ -posleft+"px");   
    }

    Prevbtn =() =>{
        let move = this.state.slide,
            now=this.state.nowclick,
            classmove,
            maxtd,//最大
            addmov,//移動幾格
            $table = document.querySelector('table');
            
        //     switch(move) {
        //         case 1:
        //             maxtd =6; 
        //             addmov=1;
        //            break;
        //         case 2:
        //             maxtd =5;
        //             addmov=1;
        //            break;
        //         case 3:
        //             maxtd =6;
        //             addmov=3;
        //            break;
        //         case 4:
        //             maxtd =3;
        //             addmov=3;
        //            break;
        //    } 
        // console.log(now );
        now= now-1;
        if(now == 0){
            now= 0;
            classmove = "";
            $table.setAttribute("class",classmove); 
            document.querySelector('.prevbtn').classList.add("disn");
            document.querySelector('.nextbtn').classList.remove("disn");
        }else{
            // now= now-addmov;
          
            classmove = "slider"+move+"-"+now;
            $table.setAttribute("class",classmove);
            // console.log(now);
            document.querySelector('.nextbtn').classList.remove("disn");
        }
        this.setState({
            nowclick:now,
            nowposleft:classmove
        })

        // let move = this.state.slide ,
        //     now =this.state.nowclick,
        //     tdw =document.querySelector('td').offsetWidth,
        //     posleft,
        //     clicklimit =Math.floor( 7 / move)-1 ;
        //     console.log(now ,clicklimit ,"prev" ,move);

        //    if(now <=1){
        //         console.log("no")
        //         now = 0;
        //         posleft =-tdw;
        //         document.querySelector('.prevbtn').classList.add("disn");
        //    }else{
        //         console.log("yes")
        //         now = move - now ;
        //         posleft =tdw*now;
        //         document.querySelector('.nextbtn').classList.remove("disn");
        //    }
        //    this.setState({
        //         nowclick:now,
        //         nowposleft:posleft
        //     })
        //     document.querySelector('table').setAttribute('style','margin-left:'+ -posleft+"px");
    }


    render(){
        const ShowData = Date.data; 
        // console.log(ShowData);
        let colnumber = this.props.show ;
        let speed=this.props.speed;
        return(
            <div className={`th_list  col${colnumber}` }>
                <a className="prevbtn " href="javascript:;" onClick={this.Prevbtn}>
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
                        let  tripStart = item.data;
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
                <table style={{ transition: speed + 's' }}>
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
                        // console.log( item.data);
                        let  tripStart = item.data;
                        return (
                            <tr key={i}>
                                   {
                                    tripStart.map((item2,j)=>{
                                        // console.log(item2.price)
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
                <a className="nextbtn" href="javascript:;" onClick={this.Nextbtn}>
                    <img src={ Nextimg}/>
                </a>
                </div>
        )
    }
}

export default Table;