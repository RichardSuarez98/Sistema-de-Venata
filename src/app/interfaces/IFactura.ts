export interface IFactura {
   /* idFactura?:     number;
    idUsuario:     number;
    idPersona:     number;
    fechaEmision:  Date;
    totalFactura:  number;
    totalProducto: number;
    detalles?:      Detalle[];*/
    
        idFactura:      number;
        cajero:       string;
        cliente:      string;
        cedula:       string;
        fechaEmision: Date;
        totalFactura: number;
    
}

export interface Detalle {
    idInventario:   number;
    cantidad:       number;
    precioUnitario: number;
}