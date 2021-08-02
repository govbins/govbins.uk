import Eng from "../src/eng";
import Sct from "../src/sct";
import Wales from "../src/wales";
import Nir from "../src/nir";
import { paramCase } from "param-case";

export default [Eng, Sct, Wales, Nir].flatMap((region) => {
  return Object.values(region).map((council) => {
    return {
      name: council.item[0].name,
      slug: paramCase(council.item[0].name),
    };
  });
});
