class ViewMainPage {
    constructor(myf) {
        this.myf = myf;
    }
    showDevices(list) {
        // cargo la lista de objetos en el DOM
        let devicesUl = this.myf.getElementById("devicesList");
        let items = "";
        for (let i in list) {
            let checkedStr = "";
            if (list[i].state == "1")
                checkedStr = "checked";
            switch (list[i].type) {
                case 0: // Lampara                     
                    items += "<li class='collection-item avatar'> \
                                <img src='images/lightbulb.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
                case 1: // Persiana                    
                    items += "<li class='collection-item avatar'> \
                                <img src='images/window.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
            }
        }
        devicesUl.innerHTML = items;
    }
    getSwitchStateById(id) {
        let el = this.myf.getElementById(id);
        return el.checked;
    }
}
class Main {
    handleEvent(evt) {
        let elem = this.myf.getElementByEvent(evt);
        // Elegimos de acuerdo al boton presionado de filtrado
        switch (elem.id) {
            case "bTodos":
                console.log("presionado boton:" + elem.id);
                this.myf.requestGET("ws/devices?filter=0", this);
                break;
            case "bLuces":
                console.log("presionado boton:" + elem.id);
                this.myf.requestGET("ws/devices?filter=1", this);
                break;
            case "bPersianas":
                console.log("presionado boton:" + elem.id);
                this.myf.requestGET("ws/devices?filter=2", this);
                break;
            default:
                console.log("click en devices:" + elem.id);
                let data = { "id": elem.id, "state": this.view.getSwitchStateById(elem.id) };
                this.myf.requestPOST("devices", data, this);
        }
    }
    handleGETResponse(status, response) {
        if (status == 200) {
            console.log(response);
            let data = JSON.parse(response);
            console.log(data);
            this.view.showDevices(data);
            for (let i in data) {
                let sw = this.myf.getElementById("dev_" + data[i].id);
                sw.addEventListener("click", this);
            }
        }
    }
    handlePOSTResponse(status, response) {
        if (status == 200) {
            console.log(response);
        }
    }
    main() {
        this.myf = new MyFramework();
        this.view = new ViewMainPage(this.myf);
        this.myf.requestGET("devices", this);
        // en clase se resolvió con configClick() pero lo hacemos mas crudo
        // no se toca el MyFramework.ts de Ej12
        // primero handler para boton "bTodos"
        let b = this.myf.getElementById("bTodos");
        b.addEventListener("click", this);
        // luego para boton "bLuces"
        b = this.myf.getElementById("bLuces");
        b.addEventListener("click", this);
        // finalment para boton "bPersianas"
        b = this.myf.getElementById("bPersianas");
        b.addEventListener("click", this);
    }
}
window.onload = () => {
    let obj = new Main();
    obj.main();
};
