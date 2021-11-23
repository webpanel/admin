import { i18n } from "i18next";

export const i18nAddResourceBundles = (i18n: i18n) => {
  i18n.addResourceBundle("en", "webpanel-admin", {
    new: "New",
    edit: "Edit",
    yes: "Yes",
    no: "No",
    detail: "Detail",
    notFoundCreateNew: "Not found, create new item",
    clearFilter: "Clear filter",
    save: "Save",
    reset: "Reset",
    resetTitle: "Reset?",
    deleteTitle: "Are you sure?",
    deleteContent: "Do you want to delete this item?",
    notFoundPageTitle: "Not found",
    notFoundPageSubTitle: "Check page address or contact tech assistance",
    notFoundPageHome: "Home",
  });
  i18n.addResourceBundle("cs", "webpanel-admin", {
    new: "Nový",
    edit: "Editace",
    yes: "Ano",
    no: "Ne",
    detail: "Detail",
    notFoundCreateNew: "Položka nenalezena, vytvořte novou",
    clearFilter: "Vymazat filtr",
    save: "Uložit",
    reset: "Reset",
    resetTitle: "Zrušit?",
    deleteTitle: "Jste si jisti?",
    deleteContent: "Opravdu chcete smazat tuto položku?",
    notFoundPageTitle: "Stránka nenalezena",
    notFoundPageSubTitle:
      "Zkontrolujte adresu stránky nebo kontaktujte technickou podporu",
    notFoundPageHome: "Domů",
  });
};
