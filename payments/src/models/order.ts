import { OrderStatus } from "@cdtickets/common";
import { Document, model, Model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttts {
    id: string,
    version: number,
    userId: string,
    price: number,
    status: OrderStatus,
}

interface OrderDoc extends Document {
    version: number,
    userId: string,
    price: number,
    status: OrderStatus,
}

interface OrderModel extends Model<OrderDoc> {
    build(attrs: OrderAttts): OrderDoc
}

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attrs: OrderAttts) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status
    })
}

const Order = model<OrderDoc, OrderModel>('order', orderSchema)

export { Order }