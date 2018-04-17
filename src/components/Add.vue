<template>
  <div class="add-component">
    <toolbar/>
    <div class="page">
      <form>
        <h1>Record a Gift</h1>
        <input tabIndex='2' v-model="donor" placeholder="Donor" ref='donor'/>
        <input tabIndex='3' v-model="gift" placeholder="Gift(s)"/>
        <textarea tabIndex='4' v-model="message" placeholder="Add an additional message (optional)"/>
        <div class="error">{{error}}</div>
        <div class="buttons">
          <button tabIndex='1' class="back-button" @click.prevent="goToDashboard">Done</button>
          <button tabIndex='5' class="submit-button" @click.prevent="addCard">Record Gift</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Toolbar } from '~/components';
import { mapState } from 'vuex';

export default {
  name: 'Add',
  components: {
    Toolbar,
  },
  data() {
    return {
      donor: '',
      gift: '',
      message: '',
      error: '',
    };
  },
  mounted() {
    this.$refs.donor.focus();
  },
  methods: {
    async addCard() {
      if (!this.donor) {
        return (this.error = 'Donor field must not be empty');
      }
      if (!this.gift) {
        return (this.error = 'Gift field must not be empty');
      }
      try {
         await this.$store.dispatch('addCard', {
          donor: this.donor,
          gift: this.gift,
          message: this.message,
          user: this.$store.state.user
        });
        (this.donor = ''), (this.gift = ''), (this.message = ''), (this.error = '');
        this.$refs.donor.focus();
      } catch (error) {
        this.error = error;
      }
    },
    goToDashboard() {
      this.$router.push('/');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-component {
  height: 100vh;
}
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}
form {
  display: flex;
  padding: 10px;
  flex-direction: column;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  width: 600px;
}
h1 {
  font-size: 30px;
}
input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 3px;
}
textarea {
  height: 150px;
  margin-top: 0px;
  margin-bottom: 10px;
  padding: 10px;
  resize: none;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 3;
  font-family: 'Arial';
}
.error {
  color: red;
  margin-bottom: 10px;
  font-size: 14px;
}
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.back-button {
  padding: 6px 12px;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 3px;
  background-color: #f5f5f5;
  cursor: pointer;
}
.submit-button {
  color: #fff;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
