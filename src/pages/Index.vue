<template>
  <Layout>
    <div class="divide__between">
      <h1>Menu</h1>
      <v-select  class="style-chooser"
            placeholder="Choose a Category Option" 
            v-model="selected" 
            :options="categories" 
            label="name"
            @input="setSelected">
      </v-select>
      <div class="pagination">
      <b-pagination class="pagination-item"
      v-model="currentPage"
      pills
      :total-rows="rows"
      :per-page="perPage"
      align="center"
      @click.native="selectPage(currentPage)"
    ></b-pagination>

      </div> 
      <!-- <v-pagination 
        v-model="currentPage" 
        :page-count="3"
        @change="selectPage(currentPage)"
        >

      </v-pagination> -->
      <!-- <b-pagination 
        v-model="currentPage" 
        pills 
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        @click.native="selectPage(currentPage)">
      </b-pagination> -->
      
      
      <g-link :to="'cart'" class="button" >
        <img svg-inline src="~/assets/svg/shopping-cart.svg" alt="shopping-cart" />&nbsp; Cart
      </g-link>
    </div>
  <div>
    <div v-if="$page.allProducts.products" class="product-grid">
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
import vPagination from 'vue-plain-pagination'
export default {
  components: { vPagination },
  data() {
    return {
      productsContian: [],
      selected: 'All',
      currentPage: 1,
      perPage: 24,
      products: [{
        name: '',
        description: {
          markdown: ''
        },
        categories: [{
          name: ''
        }],
        price: '',
        images: [{
          url: ''
        }]
      }],
      categories: [{
        id: '',
        name: '',
        slug: ''
      }],
      items: 50
    }
  },
  computed: {
    rows() {
      return this.$page.allProducts.products.length
    }
  },
 created(){
  this.products = this.$page.allProducts.products
  this.categories = this.$page.allProducts.categories
  this.items = this.$page.allProducts.products.length
  if (this.selected == "All") {
    this.productsContian = this.products;
  } else {
    console.log('Selected in created : ', this.selected)
    console.log('Products lenght in created : ', this.products.length)
    
    // this.selected.includes(p.categories.name)
  }
  console.log('Index here', this.productsContian.length)
 },
 methods: {
  setSelected(value) {
    console.log('Select : ', value.name)
  },
    selectPage(page) {
      if (page == 1) {
        this.products = this.$page.page1.products
      }
      if (page == 2) {
        this.products = this.$page.page2.products
      }
      if (page == 3) {
        this.products = this.$page.page3.products
      }
    }
}
}
</script>

<page-query>
  {
    allProducts:deep {
      products {
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
        images {
          url
        }
        slug
      }
      categories {
        id
        name
        slug
      }
    }

    page1:deep {
      products(first: 24){
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
        images {
          url
        }
        slug
      }
      categories {
        id
        name
        slug
      }
    }
    page2:deep {
      products(skip: 24, first: 48){
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
        images {
          url
        }
        slug
      }
      categories {
        id
        name
        slug
      }
    }
    page3:deep {
      products(skip: 48, first: 72){
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
        images {
          url
        }
        slug
      }
      categories {
        id
        name
        slug
      }
    }
  }

</page-query>


<style>

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #f5f5f5;
  border: none;
  color: #f3752c;
  text-transform: lowercase;
  font-variant: small-caps;
  width: 13rem;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #f3752c;
}
.pagination{
  display: flex;
  list-style-type: none;
}
.pagination-item{
  
  color: #f3752c;
}
.divide__between{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.tool-block {
  /* display: flex; */
  flex-wrap: wrap;
  flex-direction: row;
  vertical-align: top;
  /* float: right; */
  justify-content: space-between;

}
.column {
  float: left;
  padding: 10px;
  flex-direction: column;
  
}
.left{
  max-width: 50%;
  padding-right: 3rem;
}
.right {
  max-width: 50%;
  padding-left: 3rem;
}
.middle {
  width: 50%;
}

.row::after{
  content: "";
  clear: both;
  width: 100%;
  display: table;
}

.button{
    display: flex;
    align-items: center;
    text-decoration: none;
    border: 1px solid #f3752c;
    background: #f3752c;
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
  color: #f3752c;
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