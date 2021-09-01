export interface IFactura {
    idFactura?:     number;
    idUsuario:     number;
    idPersona:     number;
    fechaEmision:  Date;
    totalFactura:  number;
    totalProducto: number;
    detalles?:      Detalle[];
}

export interface Detalle {
    idInventario:   number;
    cantidad:       number;
    precioUnitario: number;
}