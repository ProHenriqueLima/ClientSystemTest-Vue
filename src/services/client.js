import { http } from "./AxiosConfiguration.js";

export default {
  listClient: () => {
    return http.get("client/actives");
  },
  listClientDisabled: () => {
    return http.get("client/disabled");
  },
  changedStatusClient: (item) => {
    return http.put("client/modifiedStatus/" + item);
  },
  taxRegime: () => {
    return http.get("taxregime/all");
  },
  salvarCliente: (cliente) => {
    return http.post("client", cliente);
  },
};
