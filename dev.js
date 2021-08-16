$(document).ready(function() {

    // Altera DOM
    $(document).ajaxStop(function() {

        // Segunda Fase
        if ($("[name=R122CEX_USU_LIBFA2]").length > 0) {

            if ($("[name=R122CEX_USU_LIBFA2] option:selected").val() == 'S') {
                $('#cv-paginas > ul > li:nth-child(3)').show();
                $('#cv-paginas > ul > li:nth-child(4)').show();
            }

            // Radio button diferenciado para o personality
            $("#FORM_GRUPO_2_7 .cv-div-resposta input").after('<span class="checkmark"></span>');

            // Corta os primeiros caracteres do persolnality para aparecer apenas "Questão 01".
            // A aplicação vem por padrão "1. Questão 01"
            $("#FORM_GRUPO_2_7 .ui-accordion-header .cv-div-hintquest").each(function() {
                if ($(this).text().length == 15) {
                    $(this).text($(this).text().substr(4));
                }
                if ($(this).text().length == 16) {
                    $(this).text($(this).text().substr(5));
                }
            });
        }

        /* Placeholders - Insere o placeholder em cada campo, copiando o título */
        $(".cv-campo").each(function() {
            var placeholder = $(this).parent().find('label').html();
            $(this).attr("placeholder", placeholder);
        });

        $("select.cv-campo option:contains('Selecione uma')").each(function() {
            $(this).val('');
            if ($(this).parent().find('[selected=selected]').length == 0) {
                $(this).attr('selected', 'selected');
            }
            var placeholder = $(this).parent().parent().find('label').html();
            $(this).html(placeholder);
        });

    });

    const frase = "Ola! Gostaria de suporte para o Trabalhe conosco!";

    window.onload = function() {
        var blipClient = new BlipChat();
        blipClient.withAppKey('YXR0b3NlbWVudGVzOjFkNDkxNjZiLTQ4MWYtNGI3Ni1hNTA1LWU4NzVhMTZhOGJjNw==')
            .withButton({ "color": "#2CC3D5", "icon": "" })
            .withCustomCommonUrl('https://chat.blip.ai/')
            .withEventHandler(BlipChat.LOAD_EVENT, function() {
                blipClient.sendMessage({
                    "type": "text/plain",
                    "content": frase
                });
            })
            .build();
    };

    if ($("#an-table-anuncios").length) {
        window.onload = function() {
            $("#an-table-anuncios").dataTable().fnDestroy();
            $("#an-table-anuncios").dataTable({
                "bPaginate": false,
                "bSort": true,
                "aaSortingFixed": [
                    [0, 'asc']
                ],
                "bFilter": false,
                "bInfo": false,
                "bDestroy": true
            });
        }
    }

    // Se for a página do currículo
    if ($("#cv-frmcurriculo").length > 0) {

        // Sempre quebrar linha após textarea
        $("textarea").parent().parent().css({ "clear": "both" })

        // Máscaras
        if ($("[name=R122CEX_DATNAS]").length > 0)
            $("[name=R122CEX_DATNAS]").setMask('99/99/9999');

        if ($("[name=R122CEX_CPFCAN]").length > 0)
            $("[name=R122CEX_CPFCAN]").setMask('999.999.999-99');

        if ($("[name=R122CEX_CODCEP]").length > 0)
            $("[name=R122CEX_CODCEP]").setMask('99999-999');

        $("#R122CEX_USU_QTDIRM_2_2_22").setMask('999');

        // Placeholder dados complementares -> texto maior que o suportado pelo sistema
        $('#R122CEX_OBSCAN_2_3_13').attr('placeholder', '\nNeste espa\u00e7o, fique a vontade para falar sobre voc\u00ea ou qualquer outro tema');

        //SELECT BOX -> ESTADO CIVIL ORDER
        selecionado = $("#R122CEX_ESTCIV_1_1_4").children("option:selected").val();
        $("#R122CEX_ESTCIV_1_1_4").html($('#R122CEX_ESTCIV_1_1_4 option').sort(function(x, y) {
            return $(x).val() < $(y).val() ? -1 : 1;
        }));
        $("#R122CEX_ESTCIV_1_1_4").get(0).selectedIndex = selecionado;

        // MOVE -> 'HISTORICO PROFISSIONAL' -> 'SEU CURRICULO'
        $("#GRUPO_3_1").appendTo("#Pagina_1");

        // OPORTUNIDADES -> CRIA CAMPO E MOVE
        $('#GRUPO_3_1').after('<div id="anuncios_frame" class="cv-grupo"><div class="cv-div-campos"></div></div>');
        $("#anuncios_frame>.cv-div-campos").html($('#Pagina_oportunidade').html());

        // MUDA TEXTO 'VÍDEO DE APRESENTACAO'
        $('#GRUPO_2_7 > .cv-grupo-maximiza div').text('Queremos conhecer voc\u00EA melhor, insira um v\u00EDdeo de apresenta\u00e7\u00E3o.');

        /* Placeholders - Insere o placeholder em cada campo, copiando o título */
        $(".cv-campo").each(function() {
            var placeholder = $(this).parent().find('label').html();
            $(this).attr("placeholder", placeholder);
        });

        $("select.cv-campo option:contains('Selecione uma')").each(function() {
            $(this).val('');
            if ($(this).parent().find('[selected="selected"]').length == 0) {
                $(this).attr('selected', 'selected');
            }
            var placeholder = $(this).parent().parent().find('label').html();
            $(this).html(placeholder);
        });

        // FORMAÇÃO -> TRANSFERE INPUT 'ANO INICIO' E 'ANO FIM' PARA INPUT 'PERÍODO'
        $('#R122CCF_USU_ANOINI_1_8_8')
            .attr("size", 12)
            .setMask('9999')
            .keyup(function() {
                $('#R122CCF_PERINI_1_8_11').val('01/01/' + $(this).val())
            });
        $('#R122CCF_USU_ANOFIM_1_8_9')
            .attr("size", 14)
            .setMask('9999')
            .keyup(function() {
                $('#R122CCF_PERFIM_1_8_12').val('31/12/' + $(this).val())
            });

        // CONTADOR DO QUESTIONARIO
        var counterRadio = 40 - $('input:radio:checked').length;
        var defaultText = $('#ORIQUE_001_007').text();
        if (counterRadio == 0) {
            $('#R122CEX_CAMAUX1_2_5_2').val("1");
            var counterIniText = " Resta ";
            var counterEndText = " quest\u00e3o.";
        } else if (counterRadio == 1) {
            var counterIniText = " Resta ";
            var counterEndText = " quest\u00e3o.";
        } else {
            var counterIniText = " Restam ";
            var counterEndText = " quest\u00f5es.";
        }
        $('#ORIQUE_001_007').text(defaultText + counterIniText + counterRadio + counterEndText);
        $(".cv-campo.cv-input-radio").click(function() {
            var counterRadio = 40 - $('input:radio:checked').length;
            if (counterRadio == 0) {
                $('#R122CEX_CAMAUX1_2_5_2').val("1");
                var counterIniText = " Resta ";
                var counterEndText = " quest\u00e3o.";
            } else if (counterRadio == 1) {
                var counterIniText = " Resta ";
                var counterEndText = " quest\u00e3o.";
            } else {
                var counterIniText = " Restam ";
                var counterEndText = " quest\u00f5es.";
            }
            $('#ORIQUE_001_007').text(defaultText + counterIniText + counterRadio + counterEndText);
        });

        // ADICIONA CLASSE BOTÃO -> BOTÃO SALVAR -> HISTORICO PROFISSIONAL
        $("#GRUPO_MESTRE_DETALHE_3_1 > div.cv-div-buttons-empresa-anterior").attr('class', 'ui-dialog-buttonset cv-div-buttons-empresa-anterior');

        // MUDA TEXTO ABA -> INFORMACOES COMPLEMENTARES
        $('#cv-paginas > ul > li:nth-child(4) > a').text("teste de perfil");

        $(window).on('load', function() {

            // if ($("[name=R122CEX_USU_LIBFA2] option:selected").val() == 'S') {
            //     $('#R122CEX_CAMAUX1_2_5_2').val("");
            // }

            // MOVE -> NIVEL DE FORMAÇÃO -> FORMAÇÃO
            $('#GRUPO_1_8 > div.cv-grupo-maximiza.rh-grupo-maximiza.ui-accordion-header.ui-helper-reset.ui-state-default.ui-corner-all.grupo-criado').after($('#FORM_GRUPO_1_6'));

            // MUDA TEXTO GRUPO 'EXPERIENCIA EM METODOLOGIAS...'
            $('#GRUPO_1_12 > div.cv-grupo-maximiza.rh-grupo-maximiza.ui-accordion-header.ui-helper-reset.ui-state-default.ui-corner-all.grupo-criado > div').text('Experi\u00eancia em sistemas, metodologias e ferramentas');
            // MUDA TEXTO DE INSERÇÃO AO GRUPO 'EXPERIENCIA EM METODOLOGIAS'
            $('#GRUPO_1_12 > div.cv-div-campos.rh-div-campos.ui-accordion-content.ui-helper-reset.ui-widget-content.ui-corner-bottom.ui-accordion-content-active > button > span').text('Experi\u00eancia em sistemas, metodologias e ferramentas');
            // RE-INSERE ICONE 
            $('<span>', {
                'class': 'ui-icon ui-icon-circle-plus'
            }).prependTo('#GRUPO_1_12 > div.cv-div-campos.rh-div-campos.ui-accordion-content.ui-helper-reset.ui-widget-content.ui-corner-bottom.ui-accordion-content-active > button > span');

            // REMOVE CLASSE MOVE MODAL
            $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons.ui-draggable.ui-resizable').removeClass("ui-draggable ui-resizable");

            // RECONSTROI TABELA DE ANUNCIOS DE FORMA ORDENADA E COMPLETA
            // TABELA ANUNCIOS -> RECONFIGURA

            $('#cv-oportunidade').contents().find("#an-table-anuncios > thead > tr > th:nth-child(5)").hide()
            $('#cv-oportunidade').contents().find("#an-table-anuncios > tbody > tr > td:nth-child(5)").each(function() {
                $(this).hide()
            })
            $('#cv-oportunidade').contents().find("#an-table-anuncios > thead > tr > th:nth-child(4)").hide()
            $('#cv-oportunidade').contents().find("#an-table-anuncios > tbody > tr > td:nth-child(4)").each(function() {
                $(this).hide()
            })
            $('#cv-oportunidade').contents().find("#an-table-anuncios > thead > tr > th:nth-child(1)").hide()
            $('#cv-oportunidade').contents().find("#an-table-anuncios > tbody > tr > td:nth-child(1)").each(function() {
                $(this).hide()
            })

            $("#cv-oportunidade").contents().find("#an-table-anuncios").dataTable().fnDestroy();
            $("#cv-oportunidade").contents().find("#an-table-anuncios").dataTable({
                "bPaginate": false,
                "bSort": true,
                "aaSortingFixed": [
                    [1, 'asc']
                ],
                "bFilter": false,
                "bInfo": false,
                "bDestroy": true
            });

            $("#cv-oportunidade").height(
                $("#cv-oportunidade").contents().find("#an-table-anuncios").height() + 90
            );

        });

        // ENDEREÇOS ELETRONICOS -> MUDA PLACEHOLDER 
        $('#R122EEL_CODEEL_1_5_1').change(function() {
            switch ($(this).children("option:selected").text()) {
                case "LinkedIn":
                    $("#R122EEL_ENDELE_1_5_2").attr('placeholder', '*Exemplo: https://www.linkedin.com/in/seu-Perfil/');
                    break;
                case "Instagram":
                    $("#R122EEL_ENDELE_1_5_2").attr('placeholder', '*Exemplo: https://www.instagram.com/seu-Perfil/');
                    break;
                case "Facebook":
                    $("#R122EEL_ENDELE_1_5_2").attr('placeholder', '*Exemplo: https://wwww.facebook.com/seu-Perfil');
                    break;
                case "Site pessoal":
                    $("#R122EEL_ENDELE_1_5_2").attr('placeholder', '*Exemplo: https://www.seu-site.com.br');
                    break;
                default:
                    $("#R122EEL_ENDELE_1_5_2").attr('placeholder', '*Endere\u00E7o.');
                    break;
            }
        });


        // RELACIONAMENTO POSITIVO -> DADOS COMPLEMENTARES
        switch ($("#R122CEX_USU_CONFUN_2_3_4").children("option:selected").val()) { // GERAL -> CONHECE ALGUEM QUE TRABALHA...
            case 'S':
                $("#FORM_GRUPO_2_3 > div > div:nth-child(2)").show();
                $("#FORM_GRUPO_2_3 > div > div:nth-child(3)").show();
                $("#FORM_GRUPO_2_3 > div > div:nth-child(4)").show();
                break;
            default:
                $("#FORM_GRUPO_2_3 > div > div:nth-child(2)").hide();
                $("#FORM_GRUPO_2_3 > div > div:nth-child(3)").hide();
                $("#FORM_GRUPO_2_3 > div > div:nth-child(4)").hide();
                $("#FORM_GRUPO_2_3 > div > div:nth-child(5)").hide();
                break;
        }
        $("#R122CEX_USU_CONFUN_2_3_4").change(function() {
            switch ($(this).children("option:selected").val()) {
                case 'S':
                    $("#FORM_GRUPO_2_3 > div > div:nth-child(2)").show();
                    $("#FORM_GRUPO_2_3 > div > div:nth-child(3)").show();
                    $("#FORM_GRUPO_2_3 > div > div:nth-child(4)").show();
                    break;
                default:
                    $("#FORM_GRUPO_2_3 > div > div:nth-child(2)").hide();
                    $("#FORM_GRUPO_2_3 > div > div:nth-child(3)").hide();
                    $("#FORM_GRUPO_2_3 > div > div:nth-child(4)").hide();
                    $("#FORM_GRUPO_2_3 > div > div:nth-child(5)").hide();
                    break;
            }
        })

        switch ($("#R122CEX_USU_PARFUN_2_3_6").children("option:selected").val()) {
            case 'S':
                $("#FORM_GRUPO_2_3 > div > div:nth-child(5)").show();
                break;
            default:
                $("#FORM_GRUPO_2_3 > div > div:nth-child(5)").hide();
                break;
        }
        $("#R122CEX_USU_PARFUN_2_3_6").change(function() {
            switch ($(this).children("option:selected").val()) {
                case 'S':
                    $("#FORM_GRUPO_2_3 > div > div:nth-child(5)").show();
                    break;
                default:
                    $("#FORM_GRUPO_2_3 > div > div:nth-child(5)").hide();
                    break;
            }
        });

        switch ($('#R122CEX_USU_TEMRES_2_3_22').children("option:selected").val()) {
            case 'S':
                $('#FORM_GRUPO_2_3 > div > div:nth-child(7)').show();
                break;
            default:
                $('#FORM_GRUPO_2_3 > div > div:nth-child(7)').hide();
                break;
        }
        $('#R122CEX_USU_TEMRES_2_3_22').change(function() {
            switch ($(this).children("option:selected").val()) {
                case 'S':
                    $('#FORM_GRUPO_2_3 > div > div:nth-child(7)').show();
                    break;
                default:
                    $('#FORM_GRUPO_2_3 > div > div:nth-child(7)').hide();
                    break;
            }
        })

        switch ($('#R122CEX_USU_ESPTRA_2_4_3').children("option:selected").val()) {
            case 'S':
                $('#FORM_GRUPO_2_4 > div > div:nth-child(4)').show();
                $('#FORM_GRUPO_2_4 > div > div:nth-child(5)').show();
                break;
            default:
                $('#FORM_GRUPO_2_4 > div > div:nth-child(4)').hide();
                $('#FORM_GRUPO_2_4 > div > div:nth-child(5)').hide();
                break;
        }
        $('#R122CEX_USU_ESPTRA_2_4_3').change(function() {
            switch ($(this).children("option:selected").val()) {
                case 'S':
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(4)').show();
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(5)').show();
                    break;
                default:
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(4)').hide();
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(5)').hide();
                    break;
            }
        })

        switch ($('#R122CEX_USU_TEMFIL_2_4_6').children("option:selected").val()) {
            case 'S':
                $('#FORM_GRUPO_2_4 > div > div:nth-child(7)').show();
                $('#FORM_GRUPO_2_4 > div > div:nth-child(8)').show();
                $('#FORM_GRUPO_2_4 > div > div:nth-child(9)').show();
                break;
            default:
                $('#FORM_GRUPO_2_4 > div > div:nth-child(7)').hide();
                $('#FORM_GRUPO_2_4 > div > div:nth-child(8)').hide();
                $('#FORM_GRUPO_2_4 > div > div:nth-child(9)').hide();
                break;
        }
        $('#R122CEX_USU_TEMFIL_2_4_6').change(function() {
            switch ($(this).children("option:selected").val()) {
                case 'S':
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(7)').show();
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(8)').show();
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(9)').show();
                    break;
                default:
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(7)').hide();
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(8)').hide();
                    $('#FORM_GRUPO_2_4 > div > div:nth-child(9)').hide();
                    break;
            }
        })


        // Preencher endereço via CEP
        /*
        function limpa_formulario_cep() {
            // Limpa valores do formulário de cep.
            $("[name=R122CEX_ENDCAN]").val("");
            $("[name=R122CEX_NOMBAI]").val("");
            $("[name=R122CEX_CODEST]").val("");
            $("[name=R122CEX_CODCID]").val("");
        }
        
        //Quando o campo cep perde o foco.
        $("body").on('blur', '[name=R122CEX_CODCEP]', function() {
            
            //Nova variável "cep" somente com dígitos.
            var cep = $(this).val().replace(/\D/g, '');
            
            //Verifica se campo cep possui valor informado.
            if (cep != "") {
                
                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;
                
                //Valida o formato do CEP.
                if (validacep.test(cep)) {
                    
                    //Preenche os campos com "..." enquanto consulta webservice.
                    $("[name=R122CEX_ENDCAN]").val("Buscando...");
                    $("[name=R122CEX_NOMBAI]").val("Buscando...");
                    $("[name=R122CEX_CODEST]").val("Buscando...");
                    $("[name=R122CEX_CODCID]").val("Buscando...");
                    

                    //Consulta o webservice viacep.com.br/
                    $.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados) {
                        
                        if (!("erro" in dados)) {
                            //Atualiza os campos com os valores da consulta.
                            $("[name=R122CEX_ENDCAN]").val(dados.logradouro);
                            $("[name=R122CEX_NOMBAI]").val(dados.bairro);
                            $("[name=R122CEX_CODEST]").val(dados.uf).trigger("change");
                            
                            // Aguardar ajax popular cidades do estado
                            $(document).ajaxStop(function() {
                                $("[name=R122CEX_CODCID]").val(dados.ibge);
                            });

                            
                        } //end if.
                        else {
                            //CEP pesquisado não foi encontrado.
                            limpa_formulario_cep();
                            alert("CEP nao encontrado.");
                        }
                    });
                    $("[name=R122CEX_ENDNUM]").focus();
                } //end if.
                else {
                    //cep é inválido.
                    limpa_formulario_cep();
                    alert("Formato de CEP invalido.");
                }
            } //end if.
            else {
                //cep sem valor, limpa formulário.
                limpa_formulario_cep();
            }
        });
		*/

        // $('#cv-paginas > ul > li:nth-child(3) > a').show();
        // $('#cv-paginas > ul > li:nth-child(4) > a').show();
    }

    $('body').show();

});