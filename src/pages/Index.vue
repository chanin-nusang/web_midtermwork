<template>
  <Layout>
    <div class="divide__between">
      <h1>Showcase</h1>
      <g-link :to="'cart'" class="button" >
        <img svg-inline src="~/assets/svg/shopping-cart.svg" alt="shopping-cart" />&nbsp; Cart
      </g-link>
    </div>
  <div>
    <div v-if="$page.deep.products" class="product-grid">
      <div
        v-for="(product) in products"
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
  data() {
    return {
    
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
    }
  },
 created(){
  this.products = this.$page.deep.products
 },
 
 
}
</script>

<page-query>
  {
    deep{
      products {
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
    }
  }

</page-query>


<style>
.divide__between{
  display: flex;
  justify-content: space-between;
}
.button{
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
.button:hover{
  background: #f3752c;
  color: #f5f5f5;
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
  color: #f75409;
  font-weight: 700;
  margin-bottom: .5rem;
}
.product-name:hover{
   color: #922f17;
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