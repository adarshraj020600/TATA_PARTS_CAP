namespace tata.parts;

using { cuid } from '@sap/cds/common';

entity Materials : cuid {
      materialId    :String(20);
      description   : String(100);
      materialType  : String(30);
      unit          :String(5);
      safetyStock   :Integer;
}

entity Plants : cuid {
    plantId     :String(10);
    plantName   :String(100);
    location    :String(100);    
}

entity Stocks :cuid {
    material : Association to Materials;
    plant    : Association to Plants;
    unrestrictedQty : Integer;
    reservedQty   : Integer;

}
