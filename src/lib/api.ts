import getConfig from "next/config";
import type { AutoFormSubject } from "../types/api";
import { translit } from "./utils";

const {
  publicRuntimeConfig: { autoformPublicToken },
} = getConfig();

const legal_form_out = [
  "Iná organizácia verejnej správy",
  "Iná právnicka osoba",
  "Jednoduchá spoločnosť na akcie",
  "Komanditná spoločnosť",
  "Komora (s výnimkou profesných komôr)",
  "Medzinárodné organizácie a združenia",
  "Nadácia",
  "Národná banka Slovenska",
  "Národný výbor",
  "Neinvestičný fond",
  "Nešpecifikovaná právna forma",
  "Nezisková organizácia",
  "Nezisková organizácia poskytujúca všeobecne prospešné služby",
  "Obecný podnik",
  "Obecný úrad",
  "Obec (obecný úrad), mesto (mestský úrad)",
  "Organizačná zložka podniku",
  "Politická strana, politické hnutie",
  "Poľovnícka organizácia",
  "Pozemkové spoločenstvo",
  "Príspevková organizácia",
  "Rozpočtová organizácia",
  "Rozpočtové a príspevkové organizácie",
  "Samosprávny kraj (úrad samosprávneho kraja)",
  "Sociálna a zdravotné poisťovne",
  "Spoločenstvá vlastníkov pozemkov, bytov a pod",
  "Spoločenstvo vlastníkov bytov a nebytových priestorov",
  "Spoločnosť s ručením obmedzeným",
  "Štátny podnik",
  "Stavovská organizácia - profesná komora",
  "Verejná obchodná spoločnosť",
  "Verejná výskumná inštitúcia",
  "Verejnoprávna inštitúcia",
  "Vysoká škola",
  "Zahraničná osoba, právnická osoba so sídlom mimo územia SR",
  "Zahraničné kultúrne, informačné stredisko, rozhlasová, tlačová a televízna agentúra",
  "Zastúpenie zahraničnej právnickej osoby",
  "Zastupiteľské orgány iných štátov",
  "Záujmové združenie právnických osôb",
  "Združenie účastníkov pozemkových úprav",
  "Združenie (zväz, spolok, spoločnosť, klub ai.)",
];

export const getAutoformByPersonName = async (
  name: string,
): Promise<AutoFormSubject[]> => {
  const baseUrl =
    "https://autoform.ekosystem.slovensko.digital/api/corporate_bodies";
  const limit = 20;

  const query = `name:${encodeURI(name)}`;

  try {
    const response = await fetch(
      `${baseUrl}/search?q=${query}&limit=${limit}&access_token=${autoformPublicToken}&filter=active`,
    );

    const data = await response.json();
    return data.filter(
      (subject) => !legal_form_out.includes(subject.legal_form),
    );
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getNgoByName = async (name: string) => {
  return fetch(`/api/ngo?name=${name}`).then((response) => response.json());
};

export const getNace = async () => {
  return fetch(`nace.json`)
    .then((response) => response.json())
    .then((values) => {
      return values.map((item) => ({
        ...item,
        translit: translit(item.label),
      }));
    });
};
