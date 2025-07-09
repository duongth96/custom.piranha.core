/*global
    piranha
*/

/**
 * Upload File Field Component
 * 
 * A Vue component that provides an interface for uploading and managing files,
 * particularly CSS and JavaScript files for client-side use.
 */
Vue.component("upload-file-field", {
    props: ["uid", "model", "meta"],
    data: function () {
        return {
            uploading: false,
            fileToUpload: null,
            previewUrl: null,
            isDirty: false
        };
    },
    methods: {
        /**
         * Selects a file from the user's device
         */
        selectFile: function () {
            var self = this;
            var fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute("accept", ".css,.js,.txt");
            fileInput.addEventListener("change", function () {
                if (fileInput.files && fileInput.files.length > 0) {
                    self.fileToUpload = fileInput.files[0];
                    self.uploadFile();
                }
            });
            fileInput.click();
        },

        /**
         * Uploads the selected file to the server
         */
        uploadFile: function () {
            var self = this;
            if (!self.fileToUpload) {
                return;
            }

            self.uploading = true;

            // Create form data for the upload
            var formData = new FormData();
            formData.append("file", self.fileToUpload);
            formData.append("folder", ".html"); // Always upload to .html folder

            // Send the file to the media endpoint
            fetch(piranha.baseUrl + "manager/api/media/upload", {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData,
                credentials: "same-origin"
            })
            .then(function (response) { return response.json(); })
            .then(function (result) {
                if (result.status === 200) {
                    // Update the model with the uploaded file information
                    self.model.value.id = result.media.id;
                    self.model.value.filename = result.media.filename;
                    self.model.value.contentType = result.media.contentType;
                    self.model.value.size = result.media.size;
                    self.model.value.publicUrl = result.media.publicUrl;
                    self.model.value.uploadDate = new Date();

                    self.isDirty = true;
                    self.notifyChange();
                } else {
                    // Show error message
                    piranha.notifications.push({
                        type: "danger",
                        body: "Failed to upload file: " + result.status
                    });
                }
                self.uploading = false;
                self.fileToUpload = null;
            })
            .catch(function (error) {
                console.error("Error uploading file:", error);
                piranha.notifications.push({
                    type: "danger",
                    body: "An error occurred while uploading the file."
                });
                self.uploading = false;
                self.fileToUpload = null;
            });
        },

        /**
         * Removes the currently uploaded file
         */
        removeFile: function () {
            this.model.value.id = null;
            this.model.value.filename = null;
            this.model.value.contentType = null;
            this.model.value.size = null;
            this.model.value.publicUrl = null;
            this.model.value.uploadDate = null;
            this.model.value.description = null;

            this.isDirty = true;
            this.notifyChange();
        },

        /**
         * Updates the file description
         */
        updateDescription: function () {
            this.isDirty = true;
            this.notifyChange();
        },

        /**
         * Notifies the parent component that the field has changed
         */
        notifyChange: function () {
            // Check if we should notify parent component about title changes
            if (this.meta && this.meta.notifyChange) {
                this.$emit('update-title', {
                    uid: this.uid,
                    title: this.model.value.filename || ''
                });
            }
        },

        /**
         * Gets the file size in a human-readable format
         */
        getFileSize: function (bytes) {
            if (!bytes) return "0 Bytes";
            const k = 1024;
            const sizes = ["Bytes", "KB", "MB", "GB"];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
        },

        /**
         * Gets the file icon based on content type
         */
        getFileIcon: function () {
            if (!this.model.value.contentType) return "fas fa-file";
            
            if (this.model.value.contentType.includes("text/css")) {
                return "fab fa-css3-alt";
            } else if (this.model.value.contentType.includes("javascript")) {
                return "fab fa-js";
            } else if (this.model.value.contentType.includes("text/plain")) {
                return "fas fa-file-alt";
            }
            
            return "fas fa-file";
        },

        /**
         * Opens the file in a new tab
         */
        openFile: function () {
            if (this.model.value.publicUrl) {
                window.open(this.model.value.publicUrl, "_blank");
            }
        }
    },
    computed: {
        /**
         * Gets the file extension from the filename
         */
        fileExtension: function () {
            if (!this.model.value.filename) return "";
            return this.model.value.filename.split(".").pop().toLowerCase();
        }
    },
    template: `
        <div class="upload-file-field" :class="{ 'is-dirty': isDirty }">
            <div v-if="!model.value.filename" class="upload-placeholder">
                <button v-if="!uploading" class="btn btn-primary" @click="selectFile" type="button">
                    <i class="fas fa-upload"></i> Upload File
                </button>
                <div v-else class="upload-progress">
                    <i class="fas fa-spinner fa-spin"></i> Uploading...
                </div>
            </div>
            <div v-else class="file-info">
                <div class="file-preview">
                    <i :class="getFileIcon()"></i>
                </div>
                <div class="file-details">
                    <h5 class="file-name">{{ model.value.filename }}</h5>
                    <div class="file-meta">
                        <span class="badge badge-secondary">{{ fileExtension }}</span>
                        <span class="text-muted">{{ getFileSize(model.value.size) }}</span>
                        <span v-if="model.value.uploadDate" class="text-muted">
                            Uploaded: {{ new Date(model.value.uploadDate).toLocaleString() }}
                        </span>
                    </div>
                    <div class="form-group mt-3">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="model.value.description" @change="updateDescription">
                    </div>
                    <div class="file-actions mt-3">
                        <button class="btn btn-sm btn-primary" @click="openFile">
                            <i class="fas fa-external-link-alt"></i> Open
                        </button>
                        <button class="btn btn-sm btn-danger" @click="removeFile">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                        <button class="btn btn-sm btn-secondary" @click="selectFile">
                            <i class="fas fa-exchange-alt"></i> Replace
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
});