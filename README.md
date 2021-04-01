# admin

Webpanel Administration library for creating various admin interfaces.

# Getting started

```
npx create-react-app my-app --template typescript --use-npm
cd my-app
npm add react@16.9.0 react-dom@16.9.0 webpanel-admin webpanel-antd webpanel-data antd@4.7.3 i18next react-i18next
```

Update `src/App.tsx` to following content:

```
import * as React from "react";

import { AdminLayout, Entity } from "webpanel-admin";
import { DataSource, RestConnector } from "webpanel-data";

// DataSource
const connector = new RestConnector();

export const api = new DataSource(
  "api",
  connector,
  "https://jsonplaceholder.typicode.com/"
);

// Entity config
const todo = new Entity({
  name: "Todo",
  dataSource: api,
})
  .stringField("name")
  .booleanField("completed");

// Admin initialization
const App = () => {
  return (
    <AdminLayout
      logout={() => {
        // do logout
      }}
      logoURL="/logo.svg"
      logoCollapsedURL="/logo.svg"
      menu={{ theme: "dark" }}
      entities={() => [todo]}
    />
  );
};

export default App;
```

Start the application:
```
npm start
```

If You want to see the recommended project structure, please see [Example project](https://github.com/webpanel/example)