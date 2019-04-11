<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box"></div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <!-- 使用饿了吗UI计数器 -->
                        <el-input-number
                          v-model="buycount"
                          :min="1"
                          :max="goodsinfo.stock_quantity"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" class="selected">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;">商品评论</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content entry" style="display: block;" v-html="goodsinfo.content"></div>
              <div class="tab-content" style="display: block;">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li>
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>匿名用户</span>
                          <span>2017/10/23 14:58:59</span>
                        </div>
                        <p>testtesttest</p>
                      </div>
                    </li>
                    <li>
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>匿名用户</span>
                          <span>2017/10/23 14:59:36</span>
                        </div>
                        <p>很清晰调动单很清晰调动单</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <div id="pagination" class="digg">
                      <span class="disabled">« 上一页</span>
                      <span class="current">1</span>
                      <span class="disabled">下一页 »</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="it in hotgoodslist">
                    <div class="img-box">
                      <!-- <a href="#/site/goodsinfo/90" class> -->
                      <router-link :to="'/detail/'+it.id">
                        <img :src="it.img_url">
                      </router-link>
                      <!-- </a> -->
                    </div>
                    <div class="txt-box">
                      <router-link :to="'/detail/'+it.id">{{it.title}}</router-link>
                      <span>{{it.add_time | formatTime('YYYY-MM-DD')}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsinfo: {},
      hotgoodslist: {},
      imglist: [],
      buycount: 1
    };
  },
  methods: {
    getData(id) {
      window.scrollTo(0,0);
      this.$http
        .get(`site/goods/getgoodsinfo/${id}`)
        .then(res => {
          console.log(res);
          this.goodsinfo = res.data.message.goodsinfo;
          this.hotgoodslist = res.data.message.hotgoodslist;
          this.imglist = res.data.message.imglist;
        });
    }
  },
  watch: {
    // $route侦听的是 $router这个对象的所有数据,管的太宽了,我们只需要侦听 id的变化就行了,所以用
    // 下面这种,不过用$route也可以,只是获取值是整个对象,有点多,而我们只需要新id就够了
    "$route.params.id"(newValue, oldValue) {
      this.getData(newValue);
    }
  },
  created() {
     this.getData(this.$route.params.id);
  }
};
</script>
<style>
</style>