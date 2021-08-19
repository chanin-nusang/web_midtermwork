<template>
    <Layout>
        <div v-if="this.$page.deep.product" class="product_layout" >
            <div> 
              <g-image :src="product.images[0].url" class="img" alt="new image" />    
            </div>
            <div>
                <h1> {{ product.name }} </h1>
                    <g-link v-for="item in product.categories" :to="'category/' + item.slug" class="category-bt" :key="item.name">
                      {{ item.name }}
                    </g-link>
                <p > {{ product.description.markdown }} </p>
                <p>
                    {{ product.price.toLocaleString() }} THB
                </p>
            </div>
            <button  class="button" @click="addToCart(product)">
            Add to Cart
        </button>
        </div>
        
        
        
    </Layout>
</template>

<script>
export default {
    metaInfo: {
    title: 'Product'
  },
    data() {
        return {
        cartItems: [],
        product: [{
        name: '',
        description: {
          markdown: ''
        },
        categories: [{
          name: '',
          slug: ''
        }],
        price: '',
        images: [{
          url: ''
        }],
        slug: ''
      }],
        
        }
    },
    created(){
        this.product = this.$page.deep.product
        console.log('Product here', this.product)
    },
    methods: {
    addToCart(item) {
      this.cartItems = JSON.parse(localStorage.getItem("product"))
      if (this.cartItems == null) {
        this.cartItems = []
      }
      this.cartItems.push(item)
      localStorage.setItem("product", JSON.stringify(this.cartItems))
      console.log('Add %s to Cart', this.product.name)
      alert("ใส่ตะกร้าแล้ว รอชำระเงิน")
      // this.$router.push('/')
    }
  }
}  
</script>

<page-query>
query GetProduct($id: ID) {
    deep {
        product(where: {id: $id}) {
                id
            name
            description{
                markdown
            }
            categories{
                name
                slug
            }
            price
            images{
                url
            }
            slug
        }
    }
}
</page-query>

<style scoped>
    .img{
        width: 300px;
    }
    .product_layout{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 2rem;
    }
    .divide__between{
  display: flex;
  justify-content: space-between;
}

.button{font-family: 'Rubik', karla, -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    display: flex;
    align-items: center;
    text-decoration: none;
    border: 1px solid #922f17;
    background: #922f17;
    width: 7rem;
    text-align: center;
    justify-content: center;
    height: 3rem;
    margin-top: .75rem;
    margin-bottom: .75rem;
    border-radius: 5px;
    color: #ffffff;
}
.button:hover{
  background: #ffffff;
  color: #922f17;
}

.category-bt{font-family: 'Rubik', karla, -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    /* display: flex; */
    align-items: center;
    text-decoration: none;
    border: 1px solid #f3752c;
    background: #ffffff;
    width: 7rem;
    text-align: center;
    justify-content: center;
    height: 1.5rem;
    margin-top: .75rem;
    margin-bottom: .75rem;
    margin-right: .75rem;
    border-radius: 5px;
    color: #f3752c;
    display: inline-block;
    justify-content: space-between;
    vertical-align: middle;
}
.category-bt:hover{
  background: #f3752c;
  color: #ffffff;
}

.product-content{
  padding-top: 1.5rem;
  text-align: center;
}
.img{
  width: 300px;
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
.product-wrapper{
  padding: 1.5rem;
  width: 100%;
  border-radius: .5rem;
  position: relative;
  background-color: #f5f5f5;
}
.product-name{
  font-size: 1.125rem;
  color: #922f17;
  font-weight: 700;
  margin-bottom: .5rem;
}
.product-name:hover{
   color: #d8441f;
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