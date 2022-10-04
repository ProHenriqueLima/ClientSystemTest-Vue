<template>
  <v-app class="mb-10">
    <div>
      <v-app-bar color="#12677E" dark>
        <v-toolbar-title>Grupo Portfólio</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text href="/clientes"> Clientes </v-btn>
      </v-app-bar>
    </div>
    <v-container class="mt-5 mb-5">
      <v-row>
        <v-col>
          <v-card class="pa-1" color="#12677E" elevation="13" rounded="xl">
            <v-row>
              <v-col cols="12" sm="12">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn fab color="#13596b" elevation="0" to="/clientes">
                        <v-icon color="white">mdi-account-circle</v-icon>
                      </v-btn>
                    </div>
                    <v-list-item-title class="headline mb-1 white--text">
                      {{ customers.length }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text"
                      >Total de Clientes ativos no sistema
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-1 mx-auto"
            color="#12677E"
            elevation="13"
            rounded="xl"
          >
            <v-row>
              <v-col cols="12" sm="12">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn fab color="#13596b" elevation="0" to="/clientes">
                        <v-icon color="white">mdi-account-circle</v-icon>
                      </v-btn>
                    </div>
                    <v-list-item-title class="headline mb-1 white--text">
                      {{ this.clientesNacional }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text"
                      >Clientes com regime Simples Nacional
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-1" color="#12677E" elevation="13" rounded="xl">
            <v-row>
              <v-col cols="12" sm="12">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn fab color="#13596b" elevation="0" to="/clientes">
                        <v-icon color="white">mdi-account-circle</v-icon>
                      </v-btn>
                    </div>
                    <v-list-item-title class="headline mb-1 white--text">
                      {{ this.clientesLucro }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text"
                      >Clientes com regime Lucro Presumido
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div
      class="mx-auto mt-4"
      style="width: 80%; height: 80%; border: solid 1px; border-radius: 5 px"
    >
      <v-card-title>
        <v-icon color="#12677E" class="mr-3">mdi-account-circle</v-icon>Clientes
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar por clientes"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn dense color="primary" @click="dialogCadastro = true">
          Novo Cliente
        </v-btn>
      </v-card-title>
      <v-data-table
        :items-per-page="5"
        :headers="headers"
        :items="customers"
        :search="search"
        height="320"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn dense text color="green" small @click="excluirModel(item)">
            Ativo
          </v-btn>
        </template>
      </v-data-table>
      <div>
        <v-btn text color="red" @click="dialogDisabledTrue()">
          Recuperar Clientes</v-btn
        >
      </div>
    </div>

    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title style="font-size: 16px">
          Você deseja realmente modificar o status deste usuário ?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="desativarUsuario()">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDisabled" persistent max-width="600">
      <v-card>
        <v-card-actions>
          Clientes Desativados
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" icon @click="dialogDisabled = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>

        <v-data-table
          :items-per-page="5"
          :headers="headers"
          :items="customersDisabled"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn dense text color="red" small @click="excluirModel(item)">
              Inativo
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogCadastro" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Client Informações </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-form
                @submit.prevent="salvar"
                ref="form"
                lazy-validation
                style="width: 100%"
              >
                <v-col cols="12">
                  <v-text-field
                    label="Nome Fantasia"
                    v-model="clientCadastro.corporateName"
                    required
                    :rules="[(v) => !!v || 'O Nome fantasia é obrigatório']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="CNPJ"
                    v-model="clientCadastro.cnpj"
                    :rules="[(v) => !!v || 'O Cnpj é obrigatório']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    v-model="clientCadastro.email"
                    :rules="[(v) => !!v || 'O Email é obrigatório']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="clientCadastro.taxRegimeId"
                    :items="taxRegime"
                    item-text="name"
                    item-value="id"
                    :rules="[(v) => !!v || 'O Tipo de regime é obrigatório']"
                    label="Regime Tributário"
                  ></v-select>
                </v-col>
              </v-form>
            </v-row>
          </v-container>
          <small>*Todos os campos são obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="limparCampos()">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="salvarCliente()">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import clientService from "../services/client";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "ClientPage",
  data() {
    return {
      search: "",
      clientCadastro: {
        cnpj: "",
        corporateName: "",
        email: "",
        taxRegimeId: 0,
      },
      clientesLucro: 0,
      clientesNacional: 0,
      customers: [],
      customersDisabled: [],
      taxRegime: [],
      dialog: false,
      dialogCadastro: false,
      dialogDisabled: false,
      client: {},
      headers: [
        { text: "Cod.", value: "id" },
        { text: "Nome Fantasia", value: "corporateName" },
        { text: "Cnpj", value: "cnpj" },
        { text: "Email", value: "email" },
        { text: "Regime Tributário", value: "taxRegime.name" },
        { text: "Actions", value: "actions" },
      ],
    };
  },

  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      clientService.listClient().then((resposta) => {
        this.customers = resposta.data;
        this.clientesLucro = this.customers.filter(
          (x) => x.taxRegime.name === "Lucro Presumido"
        ).length;
        this.clientesNacional = this.customers.filter(
          (x) => x.taxRegime.name === "Simples Nacional"
        ).length;
      });
      clientService.taxRegime().then((resposta) => {
        this.taxRegime = resposta.data;
      });
    },
    salvarCliente() {
      if (this.$refs.form.validate()) {
        clientService
          .salvarCliente(this.clientCadastro)
          .then(() => {
            this.listar();
            Swal.fire({
              title: " Sucesso",
              text: "Cliente cadastrado com sucesso!",
              icon: "success",
              confirmButtonText: "Ok",
            });
            this.limparCampos();
          })
          .catch((e) => {
            Swal.fire({
              title: " Erro",
              text: e.response.data,
              icon: "error",
              confirmButtonText: "Ok",
            }); // Ou alert(e)
          });
      }
    },
    limparCampos() {
      this.dialogCadastro = false;
      this.clientCadastro.cnpj = "";
      this.clientCadastro.email = "";
      this.clientCadastro.corporateName = "";
      this.clientCadastro.taxRegimeId = 0;
    },
    dialogDisabledTrue() {
      this.dialogDisabled = true;
      clientService.listClientDisabled().then((resposta) => {
        this.customersDisabled = resposta.data;
      });
    },
    excluirModel(item) {
      this.client = item;
      console.log(this.client.id);
      this.dialog = true;
    },
    desativarUsuario() {
      clientService.changedStatusClient(this.client.id).then(() => {
        this.dialog = false;
        this.listar();
        this.dialogDisabled = false;
        Swal.fire({
          title: " Sucesso",
          text: "Status alterado com Sucesso!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
    },
  },
};
</script>
