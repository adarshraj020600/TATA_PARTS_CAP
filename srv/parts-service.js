const cds = require('@sap/cds');
const { message } = require('@sap/cds/lib/log/cds-error');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl( function() {

    this.on('recommendTransfer',async (req) => {

        const { materialId,plantId } = req.data;

        const material = await SELECT.one
        .from ('tata.parts.Materials')
        .where ({materialId});

        if(!material){
            return req.error(
               404,
                `Material ${materialId} not found`
            );
        }
        console.log('Material Found',material);

        const stocks = await SELECT
        .from('tata.parts.Stocks')
        .where({
            material_ID:material.ID
        });

        console.log('Stocks found',stocks);

        const destinationPlant = await SELECT.one
        .from('tata.parts.Plants')
        .where ({
            plantId
        });

        if(!destinationPlant){
            return req.error(
                404,
                `Plant ${plantId} Not Found`
            );
        }
        console.log('Destination plant',destinationPlant);
        console.log('Stock plant IDs:',stocks.map(stock => stock.plant_ID));
        const destinationStock = stocks.find(
            stock => stock.plant_ID === destinationPlant.ID
        );

        if(!destinationStock){
            return req.error(
                404,
                `No Stock found for material ${materialId} at plant ${plantId}`
            );
        }
        console.log('Destination stock',destinationStock)

        const destinationAvailable =
        destinationStock.unrestrictedQty - destinationStock.reservedQty;

        
        console.log('Destination Available:',destinationAvailable)
        const safetyStock = material.safetyStock;
        console.log('Safety stock:',safetyStock)

        const requiredQuantity = 
        Math.max(
            safetyStock-destinationAvailable,
            0
        );
        if (requiredQuantity === 0){
            return{
            materialId: material.materialId,
            sourcePlant:'',
            destinationPlant: plantId,
            availableAtSource: 0,
            requiredQuantity: 0,
            recommendedTransferQty:0,
            message:'No Transfer required. Destination Plant has sufficient stock.'
            }
        }
        console.log('Required Quantity',requiredQuantity)

        const sourceStocks = stocks
        .filter(stock => stock.plant_ID !== destinationPlant.ID)
        .map(stock => {
            const available =
            stock.unrestrictedQty -
            stock.reservedQty;

            const excess =
            available - 
            safetyStock;

            return{
                stock,
                available,
                excess
            }
        })
        .filter(stock => stock.excess > 0);

        console.log('Source stocks;',sourceStocks)

        sourceStocks.sort(
            (a,b) => b.excess - a.excess
        )

        const bestSourceStock = sourceStocks[0];

        console.log(
            'Best Source Stock:',
            bestSourceStock
        )
        console.log('Keys:',Object.keys(bestSourceStock))
        const recommendedTransferQty = Math.min(
            requiredQuantity,
            bestSourceStock.excess
        );
        console.log(
            'Recommneded transfer quantity:',recommendedTransferQty
        );
        console.log('Best source plant_ID',bestSourceStock.stock.plant_ID)
        const sourcePlant = await SELECT.one
        .from('tata.parts.Plants')
        .where({
            ID: bestSourceStock.stock.plant_ID
        });

        if(!sourcePlant){
            return req.error(
                404,
                'Source Plant not found'
            );
        }
        console.log(
            'Source Plant:',sourcePlant.plantId
        )
        sourceStocks.sort()
        if (sourceStocks.length === 0)  //If no plant has excess stock
        {
            return{
            materialId: material.materialId,
            sourcePlant:'',
            destinationPlant: plantId,
            availableAtSource: 0,
            requiredQuantity: requiredQuantity,
            recommendedTransferQty:0,
            message:`Shortage of ${requiredQuantity} units detected at` `+ ${plantId}, but no other plant has sufficient acces stock.`
            }
        }
        return {
            materialId: material.materialId,
            sourcePlant:sourcePlant.plantId,
            destinationPlant: plantId,
            availableAtSource: bestSourceStock.available,
            requiredQuantity: requiredQuantity,
            recommendedTransferQty:recommendedTransferQty,
            message:`Transfer ${recommendedTransferQty} units from ${sourcePlant.plantId}
            to ${plantId}.`
        }
    })
})