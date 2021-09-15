export interface IFacturar {
     idFactura?:     number;
     idUsuario?:     number;
     idPersona?:     number;
     detalles?:      Detalle[];
   //  EstadoFacturacion: boolean;
     
 }
 
 export interface Detalle {
     idInventario?:   number;
     idProducto?: number;   
     nombreProducto? : string;
     cantidad?:       number;
     precioUnitario?: number;
     total?: number;
 }