<template>
    <Layout>
        <div class="divide__between">
            <h1>Cart</h1>
        </div>
        
        <span v-if="cartItems">
              <li
                v-for="(product, index) in countList"
                :key="index"
              > 
              <div class="product-wrap">
                <g-image v-for="(images, slug) in product.images" class="img-cart" :key="slug" :src="images.url" />   
                <h4>Name: {{ product.name }}&#9;</h4> 
                <h4>Qty: x{{ product.count }}&#9;</h4>
                <h4>Price: {{ product.price.toLocaleString() }} THB</h4>
            </div>
                
              </li>
              <br />
              
            </span>
            <div class="right">
            <h2 >
                <strong>Total Price : {{ TotalPrice.toLocaleString() }} THB</strong>
              </h2>
              
            <g-link :to="'/'" class="bt" >
            Checkout
        </g-link>
        <button  class="bt-noneborder"  @click="deleteItem()" onClick="history.go(0);">
            Remove
        </button>
            </div>
            
    </Layout>
</template>

<script>
export default {
    beforeMount(){
    this.openModal()
    console.log('openModal called')
 },
  metaInfo: {
    title: 'Cart'
  },
  data() {
    return {
      TotalPrice: 0,
      cartItems: [],
      countList: [],
    }
  },
  methods: {
    handleAriaExpanded() {
      this.ariaExpanded = !this.ariaExpanded
    },
    deleteItem() {
      localStorage.removeItem("product")
      console.log("Remove all item.")
    },
    openModal() {
    
      this.countList = []
      let tempArray = []
      this.cartItems = JSON.parse(localStorage.getItem("product"))

      if (this.cartItems) {
        if (this.cartItems.length > 0) {
          this.cartItems.forEach(res => {
            let count = 1
            tempArray.forEach(resTemp => {
              if (res.id == resTemp.id) {
                count++
                res.price += resTemp.price
              }
            })
            tempArray.push({
              id: res.id,
              name: res.name,
              price: res.price,
              images: res.images,
              count: count
            })
          })
        }
        tempArray = tempArray.reverse()
      }

      var data = tempArray,
        result = Array.from(
          data.reduce(
            (m, { name, count }) => m.set(name, Math.max(m.get(name) || 0, count)),
            new Map()
          ),
          ([name, count]) => ({ name, count })
        )
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].name)
        for (let j = 0; j < this.cartItems.length; j++) {
          if (result[i].name == this.cartItems[j].name) {
            result[i].price = this.cartItems[j].price
            result[i].images = this.cartItems[j].images
          }
        }
      }

      this.countList = result
      let sum = 0
      for (let i = 0; i < this.countList.length; i++) {
        console.log(this.countList[i])
        sum += this.countList[i].price
      }
      this.TotalPrice = sum
    //   this.$bvModal.show("bv-modal-example")
    }
  }
}
</script>

<style>
.h4{
    font-weight: 300;
    width: 150px;
}
li{
    list-style-type: none;
}
.divide__between{
  display: flex;
  justify-content: space-between;
}
.bt-noneborder{
    font-family: 'Rubik', karla, -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    background: #ffffff;
    color: #f3752c;
    margin-left: 10px;
    float: right;
    border: none;
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 7rem;
    text-align: center;
    justify-content: center;
    height: 3rem;
    margin-top: .75rem;
    margin-bottom: .75rem;
    border-radius: 5px;
}
.bt{margin-left: 10px;
    float: right;
    display: flex;
    align-items: center;
    text-decoration: none;
    border: 1px solid #f3752c;
    width: 7rem;
    text-align: center;
    justify-content: center;
    height: 3rem;
    margin-top: .75rem;
    margin-bottom: .75rem;
    border-radius: 5px;
}
.bt:hover{
  background: #f3752c;
  color: #f5f5f5;
}
.product-content{
  padding-top: 1.5rem;
  text-align: center;
}
.img-cart{
  width: 100px;
  height: 100px;
  transition-delay: 500ms;
  object-fit: cover;
}
.product-grid{
  display: flex;
  flex-wrap: wrap;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  justify-content: space-between;
}
.flex-col{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
}
.link{
  display: flex;
  width: 100%;
  text-decoration: none;
  height: 100%;
}
.product-wrap{
    display: flex;
    justify-content: space-between;
    margin:0 0 20px 0;
  padding: 1.5rem;
  height: 100px;
  border-radius: .5rem;
  position: relative;
  background-color: #f5f5f5;
}
.product-name{
  font-size: 1.125rem;
  color: #662500;
  font-weight: 700;
  margin-bottom: .5rem;
}
.product-name:hover{
   color: #f3752c;
}
.right {
  float: right;
  padding: 10px;
}
.product-price{
  font-size: .875rem;
  color: #888;
  font-weight: bold;
}
@media(max-width: 760px){
  .product-grid{
    justify-content: center;   
     padding-right: 1rem;
  }
}
</style>