import "reflect-metadata";

import container from "./container";
import { TableService } from "./services/TableService";
import { createTableInput } from "./constants/CreateTableInput";

(async () => {
  const tableSvc = container.get(TableService);

  try {
    await tableSvc.createTable(createTableInput);
    const tables = await tableSvc.listTables();
    console.log("tables", tables.TableNames);
    if (tables.TableNames?.length) {
      const details = await tableSvc.describeTable({
        TableName: tables.TableNames[0],
      });
      console.log("details", details);
    }
  } catch (e) {
    console.error("catch e", e);
  }
})();
