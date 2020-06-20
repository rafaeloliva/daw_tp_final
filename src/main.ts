interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:string;
    type:number;
}
class ViewMainPage
{
    myf:MyFramework;

    constructor(myf:MyFramework)
    {
        this.myf = myf;    
    }

    showDevices(list:DeviceInt[]):void
    {
        // cargo la lista de objetos en el DOM
        let devicesUl:HTMLElement = this.myf.getElementById("devicesList");

        let items:string="";
        for(let i in list)
        {   
            let checkedStr="";
            if(list[i].state=="1")
                checkedStr="checked";

            switch(list[i].type)
            {
                case 0: // Lampara                     
                    items+="<li class='collection-item avatar'> \
                                <img src='images/lightbulb.png' alt='' class='circle'> \
                                <span class='title'>"+list[i].name+"</span> \
                                <p>"+list[i].description+"<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_"+list[i].id+"' "+checkedStr+"> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";  
                    break;  
                case 1: // Persiana                    
                    items+="<li class='collection-item avatar'> \
                                <img src='images/window.png' alt='' class='circle'> \
                                <span class='title'>"+list[i].name+"</span> \
                                <p>"+list[i].description+"<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_"+list[i].id+"' "+checkedStr+"> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";  
                    break;                                                    
            }
        }

        devicesUl.innerHTML=items;
    }

    getSwitchStateById(id:string):boolean {
        let el:HTMLInputElement = <HTMLInputElement>this.myf.getElementById(id);       
        return el.checked;
    }
}
class Main implements GETResponseListener, EventListenerObject, POSTResponseListener
{ 
    myf:MyFramework;
    view:ViewMainPage;

    handleEvent(evt:Event):void
    {
        let elem: HTMLElement = this.myf.getElementByEvent(evt);
        // Elegimos de acuerdo al boton presionado de filtrado
        switch(elem.id){
            case "bTodos":
                console.log("presionado boton:"+elem.id);
                this.myf.requestGET("ws/devices?filter=0",this);
                break;
            case "bLuces":
                console.log("presionado boton:"+elem.id);
                this.myf.requestGET("ws/devices?filter=1",this);
                break;
            case "bPersianas":
                console.log("presionado boton:"+elem.id);
                this.myf.requestGET("ws/devices?filter=2",this);
                break;
            default:
                console.log("click en devices:"+elem.id);
                let data:object = {"id":elem.id,"state":this.view.getSwitchStateById(elem.id)};
                this.myf.requestPOST("devices",data,this);
        }
    }

    handleGETResponse(status:number,response:string):void{
      if(status==200)
      {
          console.log(response);
          let data:DeviceInt[] = JSON.parse(response);
          console.log(data);
          this.view.showDevices(data);    
          
          for(let i in data)
          {
              let sw:HTMLElement = this.myf.getElementById("dev_"+data[i].id);
              sw.addEventListener("click",this);                
          }
      }
    }

    handlePOSTResponse(status:number,response:string):void{
        if(status==200)
        {
            console.log(response);
        }
    }

    main():void 
    { 
      this.myf = new MyFramework();

      this.view = new ViewMainPage(this.myf);

      this.myf.requestGET("devices",this);

      // en clase se resolvió con configClick() pero lo hacemos mas crudo
      // no se toca el MyFramework.ts de Ej12
      // primero handler para boton "bTodos"
      let b:HTMLElement = this.myf.getElementById("bTodos");  
      b.addEventListener("click",this);
      // luego para boton "bLuces"
      b = this.myf.getElementById("bLuces");
      b.addEventListener("click",this);
      // finalment para boton "bPersianas"
      b = this.myf.getElementById("bPersianas");
      b.addEventListener("click",this);
    
    } 
} 
 
window.onload = () => {
    let obj = new Main(); 
    obj.main();
};
 

