<template>
    <Layout>
        <div v-if="this.$page.deep.category"  >
            <div class="divide__between">
                <h1>{{ category.name }}</h1>
                <g-link :to="'cart'" class="button" >
                    <img svg-inline src="~/assets/svg/shopping-cart.svg" alt="shopping-cart" />&nbsp; Cart
                </g-link>
            </div>
        
    <div v-if="$page.deep.category.products" class="product-grid">
      <div
        v-for="(product) in category.products"
        :key="product.id"
        class="flex-col"
      >
        <g-link :to="'product/' + product.slug" class="link" >
        <div class="product-wrapper">
          <g-image v-for="(images, slug) in product.images" class="img" :key="slug" :src="images.url" />   
           <div class="product-content">
          <p class="product-name"> {{ product.name }}</p>
          <p class="product-price">  {{ product.price.toLocaleString() }} THB</p>
        </div>    
        </div>
       
        </g-link>  
      </div>
    </div>
  </div>
    </Layout>
</template>

<script>
export default {
    metaInfo: {
    title: 'Category'
  },
    data() {
        return {
        cartItems: [],
        products: [{
        name: '',
        description: {
          markdown: ''
        },
        categories: {
          name: ''
        },
        price: '',
        images: [{
          url: ''
        }]
      }],
        category: [{
          name: '',
        description: '',
        products:[{
            name: ''
        }],
        slug: ''
        }]
        
        }
    },
    created(){
        this.category = this.$page.deep.category
        console.log('Category here', this.category)
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
    }
  }
}  
</script>

<page-query>
query GetCategory($id: ID) {
    deep {
        category(where: {id: $id}) {
                id
            name
            description
            products{
              id
                name
                description{
                    markdown
                }
                categories{
                    name
                }
                price
                images {
                    url
                }
                slug
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
    .category_layout{
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
.category-bt:hover{
  background: #ffffff;
  color: #922f17;
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