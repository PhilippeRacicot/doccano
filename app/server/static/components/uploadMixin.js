import hljs from 'highlight.js/lib/highlight';
import hljsLanguages from './hljsLanguages';
import HTTP, { defaultHttpClient } from './http';
import Messages from './messages.vue';

hljsLanguages.forEach((languageName) => {
  /* eslint-disable import/no-dynamic-require, global-require */
  const languageModule = require(`highlight.js/lib/languages/${languageName}`);
  /* eslint-enable import/no-dynamic-require, global-require */
  hljs.registerLanguage(languageName, languageModule);
});

export default {
  components: { Messages },

  data: () => ({
    file_name: '',
    messages: [],
    format: 'json',
    bucket: '',
    isLoading: false,
    isCloudUploadActive: false,
    canUploadFromCloud: false,
  }),

  mounted() {
    hljs.initHighlighting();
  },

  created() {
    defaultHttpClient.get('/v1/features').then((response) => {
      this.canUploadFromCloud = response.data.cloud_upload;
    });
  },

  computed: {
    projectId() {
      return window.location.pathname.split('/')[2];
    },

    postUploadUrl() {
      return window.location.pathname.split('/').slice(0, -1).join('/');
    },

    cloudUploadUrl() {
      return '/cloud-storage'
        + `?project_id=${this.projectId}`
        + `&upload_format=${this.format}`
        + `&next=${encodeURIComponent('about:blank')}`;
    },
  },

  methods: {
    uploadFromGCP() {
      const formData = new FormData();
      formData.append('file', this.file_name);
      formData.append('bucket', this.bucket);
      formData.append('format', this.format);

      HTTP.post('docs/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response); // eslint-disable-line no-console
          this.messages = [];
          // window.location = this.postUploadUrl;
        })
        .catch((error) => {
          this.isLoading = false;
          this.handleError(error);
        });
    },

    downloadToGCP() {
      const formData = new FormData();
      formData.append('file', this.file_name);
      formData.append('bucket', this.bucket);
      formData.append('format', this.format);

      HTTP.post('docs/download',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response); // eslint-disable-line no-console
          this.messages = [];
          // window.location = this.postUploadUrl;
        })
        .catch((error) => {
          this.isLoading = false;
          this.handleError(error);
        });
    },

    handleError(error) {
      const problems = Array.isArray(error.response.data)
        ? error.response.data
        : [error.response.data];

      problems.forEach((problem) => {
        if ('detail' in problem) {
          this.messages.push(problem.detail);
        } else if ('text' in problem) {
          this.messages = problem.text;
        }
      });
    },

  },
};
