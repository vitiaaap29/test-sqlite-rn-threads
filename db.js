import { appSchema, tableSchema, Model, Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { field } from '@nozbe/watermelondb/decorators'

import { DbTypes } from './constants'

const Tables = {
  ORDER_ITEM: 'order_item',
  ADDON: 'addon'
}

export class OrderItem extends Model {
  static table = Tables.ORDER_ITEM

  static get schema() {
    return {
      name: Tables.ORDER_ITEM,
      columns: [
        { name: 'name', type: DbTypes.STRING, isOptional: true },
        { name: 'bar_code', type: DbTypes.STRING, isOptional: true },
        { name: 'quantity', type: DbTypes.NUMBER, isOptional: true },
      ],
    }
  }

  @field('name') name
  @field('bar_code') barCode
  @field('quantity') quantity
}

export class Addon extends Model {
  static table = Tables.ADDON

  static get schema() {
    return {
      name: Tables.ADDON,
      columns: [
        { name: 'title', type: DbTypes.STRING, isOptional: true },
      ],
    }
  }

  @field('title') title
}

export function createDbInstance() {
  const schema = appSchema({
    version: 1,
    tables: [
      tableSchema(Addon.schema),
      tableSchema(OrderItem.schema),
    ]
  })

  const dbAdapter = new SQLiteAdapter({ schema, dbName: 'TestDB' })

  const db = new Database({
    modelClasses: [Addon, OrderItem],
    adapter: dbAdapter,
    actionsEnabled: true,
  })

  return db
}
