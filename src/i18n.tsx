import { i18n } from "i18next";

export const i18nAddResourceBundles = (i18n: i18n) => {
  i18n.addResourceBundle("en", "webpanel-admin", {
    new: "New",
    edit: "Edit",
    detail: "Detail",
    notFoundCreateNew: "Not found, create new item",
    clearFilter: "Clear filter",
  });
  i18n.addResourceBundle("cs", "webpanel-admin", {
    new: "Nový",
    edit: "Editace",
    detail: "Detail",
    notFoundCreateNew: "Položka nenalezena, vytvořte novou",
    clearFilter: "Vymazat filtr",
  });
};
