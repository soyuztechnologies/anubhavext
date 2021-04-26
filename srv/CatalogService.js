const cds = require('@sap/cds');

module.exports = cds.service.impl(async function(){
    const { Products }  = this.entities;
    const service = await cds.connect.to('NorthWind');
    this.on('READ', Products, async request => {
        //checks before call made to external service
        //enrich data, validations, checks...
        var data = await service.tx(request).run(request.query);
        console.log(data);
        // data.forEach(function(element, index){
        //     if(element.Price < 40){
        //         data.splice(index, 1);
        //     }
        // });
        // data.push({
        //     ID: 10,
        //     Name: "Anubhav",
        //     Description: "Anubhav Trainings",
        //     ReleaseDate: "1995-10-01T00:00:00.000Z",
        //     DiscontinuedDate: null,
        //     Rating: 5,
        //     Price: 350
        //     });

        return data;
        //once data comes from external service - post processing
        //checks, validations, enrichments, masking, reduce data size
    });
});