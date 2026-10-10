
        /*
         * ==========================================================
         * CONTROLE DE ARQUIVOS
         * ==========================================================
         */

        const uploadInput =
            document.getElementById("document-upload");

        const attachmentsTableBody =
            document.getElementById("attachments-table-body");

        let attachmentSequence = 1;


        uploadInput.addEventListener("change", function (event) {

            const files = event.target.files;

            if (!files || files.length === 0) {
                return;
            }


            /*
             * Remove mensagem "Nenhum arquivo anexado"
             */

            const emptyRow =
                document.getElementById("attachments-empty-row");

            if (emptyRow) {
                emptyRow.remove();
            }


            /*
             * Percorre arquivos selecionados
             */

            Array.from(files).forEach(function (file) {

                addAttachment(file);

            });


            /*
             * Limpa input para permitir selecionar novamente
             * o mesmo arquivo.
             */

            uploadInput.value = "";

        });


        /*
         * ==========================================================
         * ADICIONAR ARQUIVO NA TABELA
         * ==========================================================
         */

        function addAttachment(file) {

            const attachmentId =
                String(attachmentSequence).padStart(3, "0");

            const row =
                document.createElement("tr");


            row.id =
                "attachment-row-" + attachmentId;

            row.className =
                "attachment-row";

            row.setAttribute(
                "data-rpa-row",
                "attachment"
            );

            row.setAttribute(
                "data-attachment-id",
                attachmentId
            );


            /*
             * ID
             */

            const idCell =
                document.createElement("td");

            idCell.className =
                "attachment-id";

            idCell.textContent =
                attachmentId;


            /*
             * NOME
             */

            const nameCell =
                document.createElement("td");

            nameCell.className =
                "attachment-name";

            nameCell.textContent =
                file.name;


            /*
             * TIPO
             */

            const typeCell =
                document.createElement("td");

            typeCell.className =
                "attachment-type";

            typeCell.textContent =
                file.type || "Não identificado";


            /*
             * TAMANHO
             */

            const sizeCell =
                document.createElement("td");

            sizeCell.className =
                "attachment-size";

            sizeCell.textContent =
                formatFileSize(file.size);


            /*
             * DATA
             */

            const dateCell =
                document.createElement("td");

            dateCell.className =
                "attachment-date";

            dateCell.textContent =
                new Date().toLocaleString("pt-BR");


            /*
             * AÇÃO
             */

            const actionCell =
                document.createElement("td");

            actionCell.className =
                "text-center";


            const removeButton =
                document.createElement("button");

            removeButton.type =
                "button";

            removeButton.id =
                "remove-attachment-" + attachmentId;

            removeButton.className =
                "button button-danger remove-attachment-button";

            removeButton.textContent =
                "Remover";

            removeButton.setAttribute(
                "data-rpa-action",
                "remove-attachment"
            );

            removeButton.setAttribute(
                "data-attachment-id",
                attachmentId
            );


            removeButton.addEventListener(
                "click",
                function () {

                    row.remove();

                    checkEmptyAttachmentTable();

                }
            );


            actionCell.appendChild(removeButton);


            /*
             * MONTA LINHA
             */

            row.appendChild(idCell);

            row.appendChild(nameCell);

            row.appendChild(typeCell);

            row.appendChild(sizeCell);

            row.appendChild(dateCell);

            row.appendChild(actionCell);


            attachmentsTableBody.appendChild(row);

            attachmentSequence++;

        }


        /*
         * ==========================================================
         * FORMATA TAMANHO DO ARQUIVO
         * ==========================================================
         */

        function formatFileSize(bytes) {

            if (bytes === 0) {
                return "0 Bytes";
            }

            const units = [
                "Bytes",
                "KB",
                "MB",
                "GB"
            ];

            const index =
                Math.floor(
                    Math.log(bytes) /
                    Math.log(1024)
                );

            const value =
                bytes /
                Math.pow(1024, index);

            return (
                value.toFixed(2) +
                " " +
                units[index]
            );

        }


        /*
         * ==========================================================
         * VERIFICA TABELA VAZIA
         * ==========================================================
         */

        function checkEmptyAttachmentTable() {

            const rows =
                attachmentsTableBody.querySelectorAll(
                    ".attachment-row"
                );

            if (rows.length > 0) {
                return;
            }


            const emptyRow =
                document.createElement("tr");

            emptyRow.id =
                "attachments-empty-row";

            emptyRow.className =
                "empty-row";


            const cell =
                document.createElement("td");

            cell.colSpan = 6;

            cell.className =
                "empty-message";

            cell.textContent =
                "Nenhum arquivo anexado.";


            emptyRow.appendChild(cell);

            attachmentsTableBody.appendChild(emptyRow);

        }


        /*
         * ==========================================================
         * CONTROLE DOS CHECKBOXES
         * ==========================================================
         */

        const documentCheckboxes =
            document.querySelectorAll(
                ".document-checkbox"
            );


        documentCheckboxes.forEach(
            function (checkbox) {

                checkbox.addEventListener(
                    "change",
                    function () {

                        const row =
                            checkbox.closest(
                                ".document-row"
                            );

                        if (checkbox.checked) {

                            row.classList.add(
                                "selected-row"
                            );

                            row.setAttribute(
                                "data-selected",
                                "true"
                            );

                        }
                        else {

                            row.classList.remove(
                                "selected-row"
                            );

                            row.setAttribute(
                                "data-selected",
                                "false"
                            );

                        }

                    }
                );

            }
        );


        /*
         * ==========================================================
         * PROCESSAR DOCUMENTOS SELECIONADOS
         * ==========================================================
         */

        const processButton =
            document.getElementById(
                "process-selected-documents"
            );


        processButton.addEventListener(
            "click",
            function () {

                const selected =
                    document.querySelectorAll(
                        ".document-checkbox:checked"
                    );


                const selectedIds =
                    Array.from(selected)
                        .map(
                            checkbox =>
                                checkbox.dataset.documentId
                        );


                if (selectedIds.length === 0) {

                    alert(
                        "Nenhum documento selecionado."
                    );

                    return;

                }


                alert(
                    "Documentos selecionados: " +
                    selectedIds.join(", ")
                );

            }
        );

