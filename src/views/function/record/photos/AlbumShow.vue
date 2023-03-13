<template>
  <div class="album-show-container">
    <div class="album-show-card">
      <div class="album-show-main">
        <van-cell-group v-for="(photoShow, index) in photoShowList" :key="photoShow" style="overflow: auto;">
          <van-divider style="font-size: 6vw">{{ photoShow[0].gmtCreate }}</van-divider>
          <el-image
              v-for="(photo, idx) in photoShow" :key="photo.photoId"
              style="width: 31vw; height: 31vw; float: left; margin-left: 0.5vw; margin-bottom: 0.5vw;"
              :src="photo.photoUrl"
              :preview-src-list="photoShowUrlList[index]"
              :initial-index=idx
              fit="cover"
          />
        </van-cell-group>
      </div>
      <van-button icon="plus" class="album-show-add-btn" @click="showUploadPhotos=true"/>
    </div>

    <!-- 添加窗口 -->
    <van-popup v-model:show="showUploadPhotos" style="border: white solid 1vw; box-shadow: 0 0 1.5vw rgba(255, 255, 255, 0.5);">
      <van-form inset class="album-show-add-form">
        <van-cell-group>
          <div class="album-show-add-form-tittle">上 传</div>
          <van-uploader
              style="width: 88vw;"
              v-model="uploadFileList"
              multiple
              :max-count="5"
              :max-size="20 * 500 * 1024"
              @oversize="onOversize"
          />
          <div>
            <van-button
                block
                type="primary"
                @click="showUploadPhotos=false"
                class="album-show-request-btn">
              取 消
            </van-button>
            <van-button
                block
                type="primary"
                native-type="submit"
                @click="request_uploadPhotoList()"
                class="album-show-request-btn"
                style="background:#ffbcbc">
              确 认
            </van-button>
          </div>
        </van-cell-group>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import {Toast} from "vant";
import {getPhotoList, uploadPhotoList} from "@/api/record/photos";
import {formatDay} from "@/utils/timeUtils";
import {errorDealt} from "@/utils/authUtils";
import {getUserId} from "@/myConfig/auth";

export default {
  name: "AlbumShow",
  data() {
    return {
      userId: getUserId(),
      anotherId: 1,
      albumId: this.$route.query.albumId,

      photoList: [

      ], // 获取全部相册照片

      photoShowList: [], // 展示相册的列表，按时间归类
      photoShowUrlList: [], // url预览列表，相当于单独提取url供预览

      showUploadPhotos: false,
      uploadFileList: [],

    }
  },
  mounted() {
    this.request_getPhotoList();
  },
  methods: {
    request_getPhotoList() {
      let formData = new FormData();
      formData.append('albumId', this.albumId);
      getPhotoList(formData).then(resp => {
        if (resp.code === 200) {
          console.log('request_getPhotoList --success');
          let data = resp.data;
          // 先初始化列表
          this.photoList = [];
          for (let i = 0; i < data.length; ++i) {
            // 这里将时间戳毫秒数转化为日期，方便后续分组
            data[i].gmtCreate = formatDay(parseInt(data[i].gmtCreate));
            this.photoList.push(data[i]);
          }
          this.sortPhotosByDate();
        } else {
          console.log('request_getPhotoList --fail, msg=', resp.message);
        }
      }).catch(err => {
        errorDealt(err);
        console.log('request_getPhotoList --error, ', err);
      })
    },

    request_uploadPhotoList() {
      let formData = new FormData();
      this.uploadFileList.forEach(file => formData.append('file', file.file));
      formData.append('albumId', this.albumId);
      formData.append('creatorId', this.userId);
      uploadPhotoList(formData).then(resp => {
        if (resp.code === 200) {
          let data = resp.data;
          console.log('request_uploadPhotoList --success, data=', data);
          // 添加成功，将照片添加到当前页面
          for (let i = 0; i < data.length; ++i) {
            data[i].gmtCreate = formatDay(parseInt(data[i].gmtCreate));
            this.photoList.push(data[i]);
          }
          this.uploadFileList = [];
          this.sortPhotosByDate();
          this.showUploadPhotos = false;
        } else {
          console.log('request_getPhotoList --fail, msg=', resp.message);
          this.showUploadPhotos = false;
        }
      }).catch(err => {
        console.log('request_getPhotoList --error, ', err);
        this.showUploadPhotos = false;
        errorDealt(err);
      })
    },

    // 对照片按时间进行分类
    sortPhotosByDate() {
      this.photoShowList = [];
      this.photoShowUrlList = [];
      let date = new Map;
      for (let i = 0; i < this.photoList.length; ++i) {
        let tmp = this.photoList[i].gmtCreate;
        if (date.has(tmp)) {
          this.photoShowList[date.get(tmp)].push(this.photoList[i]);
          this.photoShowUrlList[date.get(tmp)].push(this.photoList[i].photoUrl);
        } else {
          date.set(tmp, this.photoShowList.length);
          let tmp_list = [];
          tmp_list.push(this.photoList[i]);
          let tmp_url_list = [];
          tmp_url_list.push(this.photoList[i].photoUrl);
          this.photoShowList.push(tmp_list);
          this.photoShowUrlList.push(tmp_url_list);
        }
      }
    },

    // 照片设置最大20MB
    onOversize(file) {
      console.log(file);
      Toast('文件大小不能超过 20mb');
    },
  }
}
</script>

<style scoped lang="scss">
.album-show-container {
  /*todo 只能通过内置边距的形式来控制距离，不然背景就跟着一起下移了*/
  padding-top: 10vh;
}

.album-show-card {
  margin: auto;
  width: 95vw;
  padding: 0;
  background: whitesmoke;
  border:2vw solid #ffbcbc;
  border-radius: 3.5vw;
  box-shadow: 0 0 1.2vw rgba(0, 0, 0, 60);
}

.album-show-main {
  overflow: auto;
  height: 72.5vh;
}

.album-show-add-btn {
  width: 100%;
  height: 6vh;
  border-bottom-left-radius: 2vw;
  border-bottom-right-radius: 2vw;
  color: white;
  font-size: 7vw;
  border-top: 2vw solid #ffbcbc;
  background: cornflowerblue;
}

.album-show-add-form {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.album-show-add-form-tittle {
  font-size: 6vw;
  color: white;
  margin: auto auto 1.5vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
  background: #ffbcbc;
}

.album-show-request-btn {
  margin-top: 8vw; font-size: 6vw; background: grey; float: left; width: 50%; border: 0
}

</style>