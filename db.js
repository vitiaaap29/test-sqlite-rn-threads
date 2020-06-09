import { appSchema, tableSchema, Model, Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { field } from '@nozbe/watermelondb/decorators'

import { DbTypes } from './constants'

export class OrderItem extends Model {
  static name = 'order_item'

  static get schema() {
    return {
      name: OrderItem.name,
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
  static name = 'addons'

  static get schema() {
    return {
      name: Addon.name,
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

  const dbAdapter = new SQLiteAdapter({ schema })

  const db = new Database({
    modelClasses: [Addon, OrderItem],
    adapter: dbAdapter,
    actionsEnabled: true,
  })

  return db
}
