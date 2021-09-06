export interface IDetalle {
    idDetalle?:      number;
    idFactura:      number;
    nombreProducto: string;
    cantidad:       number;
    precioUnitario: number;
    subtotal:       number;
    total:          number;
}