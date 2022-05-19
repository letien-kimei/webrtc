exports.clients = {
   listObj: {},
   socket_id: "",
   room: "",
   current_ip: "",
   addClients: function(){
     this.listObj[this.socket_id] = {}
     this.listObj[this.socket_id]['socket_id'] = this.socket_id
     if (this.listObj[this.socket_id]['socket_id']['room'] !== undefined){
         console.log("!== undefined")
         if(this.listObj[this.socket_id]['socket_id']['room'].length > 0){
 
         }
     }else{
         this.listObj[this.socket_id]['room'] = this.room
         this.listObj[this.socket_id]['current_ip'] = this.current_ip 
     }
   },
   getClients: function(){
       return this.listObj;
   }
}
