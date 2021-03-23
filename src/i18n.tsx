import { i18n } from "i18next";

export const i18nAddResourceBundles = (i18n: i18n) => {
  i18n.addResourceBundle("en", "webpanel-admin", {
    notFoundCreateNew: "Not found, create new item",
    clearFilter: "Clear filter",
  });
  i18n.addResourceBundle("cs", "webpanel-admin", {
    notFoundCreateNew: "Položka nenalezena, vytvořte novou",
    clearFilter: "Vymazat filtr",
  });
};
