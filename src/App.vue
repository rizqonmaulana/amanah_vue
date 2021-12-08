<template>
  <div class="container-fluid">
    <b-button
      @click="
        modalShow = !modalShow;
        form = {};
        modalType = 'create';
      "
      class="btn btn-primary"
      >Create data</b-button
    >

    <b-modal
      v-model="modalShow"
      @ok="modalType === 'create' ? createAssetHandler() : updateAssetHandler()"
    >
      <form>
        <div class="form-name">
          <label for="inputState">Name</label>
          <input type="text" class="form-control" v-model="form.name" />
        </div>

        <div class="form-type">
          <label for="inputState">Type</label>
          <select id="inputState" class="form-control" v-model="form.type">
            <option selected>Choose...</option>
            <option value="Switch">Switch</option>
            <option value="Server">Server</option>
            <option value="Router">Router</option>
          </select>
        </div>

        <div class="form-type">
          <label for="inputState">Branch</label>
          <select id="inputState" class="form-control" v-model="form.branch">
            <option selected>Choose...</option>
            <option value="Jakarta">Jakarta</option>
            <option value="Bandung">Bandung</option>
            <option value="Bogor">Bogor</option>
            <option value="Bekasi">Bekasi</option>
          </select>
        </div>

        <div class="form-type">
          <label for="inputState">Bulan</label>
          <select id="inputState" class="form-control" v-model="form.bulan">
            <option selected>Choose...</option>
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select>
        </div>

        <div class="form-type">
          <label for="inputState">Tahun</label>
          <input type="text" class="form-control" v-model="form.tahun" />
        </div>

        <div class="form-type">
          <label for="inputState">Query</label>
          <input type="number" class="form-control" v-model="form.query" />
        </div>
      </form>
    </b-modal>
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Branch</th>
              <th scope="col">Bulan</th>
              <th scope="col">Tahun</th>
              <th scope="col">Query</th>
              <th scope="col">Unique Code</th>
              <th scope="col">QR Code</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in assets" :key="index" class="">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.branch }}</td>
              <td>{{ item.bulan }}</td>
              <td>{{ item.tahun }}</td>
              <td>{{ item.query }}</td>
              <td>
                {{
                  item.type === "Switch"
                    ? "SW"
                    : item.type === "Server"
                    ? "SV"
                    : item.type === "Router"
                    ? "RT"
                    : ""
                }}{{
                  item.branch === "Jakarta"
                    ? "JKT"
                    : item.branch === "Bekasi"
                    ? "BKS"
                    : item.branch === "Bogor"
                    ? "BGR"
                    : item.branch === "Bandung"
                    ? "BDG"
                    : ""
                }}{{
                  item.bulan === "Januari"
                    ? "01"
                    : item.bulan === "Februari"
                    ? "02"
                    : item.bulan === "Maret"
                    ? "03"
                    : item.bulan === "April"
                    ? "04"
                    : item.bulan === "Mei"
                    ? "05"
                    : item.bulan === "Juni"
                    ? "06"
                    : item.bulan === "Juli"
                    ? "07"
                    : item.bulan === "Agustus"
                    ? "08"
                    : item.bulan === "September"
                    ? "09"
                    : item.bulan === "Oktober"
                    ? "10"
                    : item.bulan === "November"
                    ? "11"
                    : item.bulan === "Desember"
                    ? "12"
                    : ""
                }}{{ item.tahun.slice(2, 5) }}{{ item.query }}
              </td>
              <td>
                <qrcode-vue
                  :value="
                    item.type +
                    ' area ' +
                    item.branch +
                    ' pembelian bulan ' +
                    item.bulan +
                    ' tahun ' +
                    item.tahun +
                    ' ke ' +
                    item.query
                  "
                  :size="size"
                  level="H"
                />
              </td>
              <td>
                <button
                  class="btn btn-primary"
                  @click="
                    form = item;
                    modalShow = !modalShow;
                    modalType = 'update';
                  "
                >
                  Edit
                </button>
                <button
                  class="btn btn-danger"
                  @click="deleteAssetHandler(item.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      modalShow: false,
      form: {
        name: "",
        type: "",
        branch: "",
        bulan: "",
        tahun: "",
        query: "",
      },
      modalType: "",
      size: 100,
    };
  },
  computed: {
    ...mapGetters({
      assets: "getAssets",
    }),
  },
  methods: {
    ...mapActions([
      "getAllAssets",
      "createAsset",
      "updateAsset",
      "deleteAsset",
    ]),
    createAssetHandler() {
      this.createAsset(this.form).then(() => {
        this.getAllAssets();
        this.form = {};
        this.modalShow = false;
      });
    },
    updateAssetHandler() {
      this.updateAsset(this.form).then(() => {
        this.getAllAssets();
        this.form = {};
        this.modalShow = false;
      });
    },
    deleteAssetHandler(id) {
      this.deleteAsset(id).then(() => {
        this.getAllAssets();
      });
    },
  },
  created() {
    this.getAllAssets();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container-fluid {
  margin: 100px 50px;
}
</style>
