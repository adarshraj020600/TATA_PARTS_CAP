using { tata.parts as db } from '../db/schema';
@path: '/parts'

service PartsAvailabilityService {

    entity Materials as projection on db.Materials;
    entity Plants as projection on db.Plants;

    @readonly
    entity Stocks as projection on db.Stocks
    {
        *,
        material.safetyStock as safetyStock,
        cast(unrestrictedQty - reservedQty as Integer) as availableQty,

        cast(
        case 
            when unrestrictedQty - reservedQty <
            material.safetyStock
            then 'SORTAGE'
            else 'OK'
            end as String(20) ) as stockStatus
    };

    action recommendTransfer(
        materialId  :String(20),
        plantId     :String(10)
    ) returns {
        materialId  :String(20);
        sourcePlant     :String(10);
        destinationPlant : String(10);
        availableAtSource   :Integer;
        requiredQuantity    :Integer;
        recommendedTransferQty :Integer;
        message                 :String(200);
    };
}