const EmpleadoModel = require('../Database/Models/EmpleadoModel')

const bcrypt = require('bcrypt')

const TipoIdentificacionModel = require('../Database/Models/TipoIdentificacionModel')
const CiudadModel = require('../Database/Models/CiudadModel')
const NacionalidadModel = require('../Database/Models/NacionalidadModel')
const EstadoCivilModel = require('../Database/Models/EstadoCivilModel')
const CentroCostoModel = require('../Database/Models/CentroCostoModel')
const CargoModel = require('../Database/Models/CargoModel')
const TipoContratoModel = require('../Database/Models/TipoContratoModel')
const TiempoModel = require('../Database/Models/TiempoModel')
const EstadoContratoModel = require('../Database/Models/EstadoContratoModel')
const SalarioModel = require('../Database/Models/SalarioModel')
const AuxMovilidadModel = require('../Database/Models/AuxMovilidadModel')
const EstudiosRealizadosModel = require('../Database/Models/EstudiosRealizadosModel')
const BancoModel = require('../Database/Models/BancoModel')
const TipoCuentaModel = require('../Database/Models/TipoCuentaModel')
const EpsModel = require('../Database/Models/EpsModel')
const ArlModel = require('../Database/Models/ArlModel')
const PensionModel = require('../Database/Models/PensionModel')
const CesantiasModel = require('../Database/Models/CesantiasModel')
const CajaCompensacionModel = require('../Database/Models/CajaCompensacionModel')
const TallaCamisaModel = require('../Database/Models/TallaCamisaModel')
const TallaPantalonModel = require('../Database/Models/TallaPantalonModel')
const TallaCalzadoModel = require('../Database/Models/TallaCalzadoModel')
const TipoUsuarioModel = require('../Database/Models/TipoUsuarioModel')

const { validationResult } = require('express-validator')
const EmpresaModel = require('../Database/Models/EmpresaModel')
const sequelize = require('../Database/configBD')
const res = require('express/lib/response')
const CredencialModel = require('../Database/Models/CredencialModel')
const TipoDocumentoModel = require('../Database/Models/TipoDocumentoModel')
const TipoidentificacionModel = require('../Database/Models/TipoIdentificacionModel')
const { monthsShort } = require('moment')

const Controller = {

    getAll:async(_req, res)=>{
        const items = await EmpleadoModel.findAll({
            include:[
                { model: CentroCostoModel, attributes:['nombre_centro_costo']},
                { model: CiudadModel, as:'lugar_trabajo', attributes:['nombre_ciudad']},
                { model: EmpleadoModel, as:'jefe_directo', attributes:['nombres','apellidos']},
                { model: EmpresaModel, attributes:['nombre_empresa']}
            ],
            attributes:['id_empleado', 'numero_identificacion', 'nombres', 'fecha_ingreso'],
            where:{estado:1}
        })
        res.json(items)
    },

    getAllInactives:async(_req, res)=>{
        const items = await EmpleadoModel.findAll({
            include:[
                { model: CentroCostoModel, attributes:['nombre_centro_costo']},
                { model: CiudadModel, as:'lugar_trabajo', attributes:['nombre_ciudad']},
                { model: EmpleadoModel, as:'jefe_directo', attributes:['nombres','apellidos']},
                { model: EmpresaModel, attributes:['nombre_empresa']}
            ],
            attributes:['id_empleado', 'numero_identificacion', 'nombres', 'fecha_ingreso'],
            where:{estado:0}
        })
        res.json(items)
    },

    getOne: async(req,res)=>{
        const item = await EmpleadoModel.findByPk(req.params.id,{
            include:[
                { model: EmpresaModel, attributes:['nombre_empresa', 'nit']} 
            ]
        })
        res.json(item)
    },

    getInfoPerfil:async(req,res)=>{
        const item = await EmpleadoModel.findByPk(req.params.id,{
            include:[
                { model: TipoIdentificacionModel, attributes:['nombre_tipo_identificacion']},
                { model: CiudadModel, as:'lugar_nacimiento', attributes:['nombre_ciudad']},
                { model: CiudadModel, as:'lugar_exp_doc', attributes:['nombre_ciudad']},
                { model: NacionalidadModel, attributes:['nombre_nacionalidad']},
                { model: EstadoCivilModel, attributes:['nombre_estado_civil']},
                { model: CentroCostoModel, attributes:['nombre_centro_costo']},
                { model: CiudadModel, as:'lugar_trabajo', attributes:['nombre_ciudad']},
                { model: CargoModel, attributes:['nombre_cargo']},
                { model: TipoContratoModel, attributes:['nombre_tipo_contrato']},
                { model: TiempoModel, attributes:['nombre_tiempo']},
                { model: EmpleadoModel, as:'jefe_directo', attributes:['nombres','apellidos']},
                { model: EstadoContratoModel, attributes:['nombre_estado_contrato']},
                { model: SalarioModel, attributes:['monto_salario']},
                { model: AuxMovilidadModel, attributes:['monto_aux_movilidad']},
                { model: EstudiosRealizadosModel, attributes:['nombre_estudios']},
                { model: BancoModel, attributes:['nombre_banco']},
                { model: TipoCuentaModel, attributes:['nombre_tipo_cuenta']},
                { model: EpsModel, attributes:['nombre_eps']},
                { model: ArlModel, attributes:['nombre_arl']},
                { model: PensionModel, attributes:['nombre_pension']},
                { model: CesantiasModel, attributes:['nombre_cesantias']},
                { model: CajaCompensacionModel, attributes:['nombre_caja_comp']},
                { model: TallaCamisaModel, attributes:['nombre_talla_camisa']},
                { model: TallaPantalonModel, attributes:['nombre_talla_pantalon']},
                { model: TallaCalzadoModel, attributes:['nombre_talla_calzado']},
                { model: TipoUsuarioModel, attributes:['nombre_tipo_usuario']},
                { model: EmpresaModel, attributes:['nombre_empresa', 'nit']} 
            ],
            attributes:['id_empleado','numero_identificacion', 'nombres', 'apellidos', 'genero', 'fecha_nacimiento', 'fecha_expedicion_doc', 'fecha_ingreso', 'correo_electronico', 'direccion', 'telefono_fijo', 'celular', 'num_cuenta', 'riesgo', 'contacto_emergencia', 'tel_contacto_emergencia']
        })
        res.json(item)
    },

    getDataEmpDocs:async(req,res)=>{
        const item = await EmpleadoModel.findByPk(req.params.id,{
            attributes:['nombres','apellidos','numero_identificacion','correo_electronico','celular'],
            include:[
                {model:TipoIdentificacionModel,attributes:['nombre_tipo_identificacion']},
                {model:EmpresaModel,attributes:['nombre_empresa']},
                {model:CargoModel,attributes:['nombre_cargo']},
                {model:CentroCostoModel,attributes:['nombre_centro_costo']}
            ]})
        res.json(item)
    },

    getInfoCertiLab:async(req,res)=>{
        const info = await EmpleadoModel.findByPk(req.idEmpleado,{
            attributes:['id_empleado','nombres', 'apellidos', 'numero_identificacion', 'fecha_ingreso', 'fecha_gen_certificado' ],
            include:[
                {   
                    model:EmpresaModel,
                    attributes:['nombre_empresa','nit']
                },{
                    model:TipoIdentificacionModel,
                    attributes:['nombre_tipo_identificacion']
                },{
                    model:TipoContratoModel,
                    attributes:['nombre_tipo_contrato']
                },{
                    model:CargoModel,
                    attributes:['nombre_cargo']
                },{
                    model:SalarioModel,
                    attributes:['monto_salario']
                }
            ]
        })
        res.json(info)
    },

    updateDateGenCerti:async(req,res)=>{
        const { id } = req.params
        await EmpleadoModel.update({fecha_gen_certificado:new Date()},{where:{id_empleado:id}}).then(()=>{
            res.json("Fecha Actualiada con Exito")
        })
    },

    getAllRoles: async(_req,res)=>{
        const items = await EmpleadoModel.findAll({attributes:['id_empleado','nombres','numero_identificacion','tipo_usuario_fk']})
        res.json(items)
    },

    changeRol: async(req,res)=>{
        const { idRol } = req.body 
        await EmpleadoModel.update({
            tipo_usuario_fk: idRol
        },{
            where:{ id_empleado:req.params.id}
        }).catch(()=>{
            res.json('Error al cambiar el rol')
        })
        res.json("Rol cambiado con exito")
    },

    create: async(req,res)=>{
        const {
            tipo_identificacion_fk,
            numero_identificacion,
            nombres,
            apellidos,
            genero,
            fecha_nacimiento,
            lugar_nacimiento_fk,
            fecha_expedicion_doc,
            lugar_exp_doc_fk,
            nacionalidad_fk,
            estado_civil_fk,
            centro_costo_fk,
            lugar_trabajo_fk,
            cargo_fk,
            tipo_contrato_fk,
            tipo_tiempo_fk,
            fecha_ingreso,
            jefe_directo_fk,
            estado_contrato_fk,
            salario_fk,
            aux_movilidad_fk,
            correo_electronico,
            direccion,
            telefono_fijo,
            celular,
            estudios_fk,
            banco_fk,
            tipo_cuenta_fk,
            num_cuenta,
            eps_fk,
            arl_fk,
            riesgo,
            pension_fk,
            cesantias_fk,
            ccf_fk,
            contacto_emergencia,
            tel_contacto_emergencia,
            talla_camisa_fk,
            talla_pantalon_fk,
            talla_calzado_fk,
            empresa_fk,
            src_fotografia,
        } = req.body

        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }
        
        const resp = [false,false]
 
        const empleadoCreado = await EmpleadoModel.create({
            tipo_identificacion_fk,
            numero_identificacion,
            nombres,
            apellidos,
            genero,
            fecha_nacimiento,
            lugar_nacimiento_fk,
            fecha_expedicion_doc,
            lugar_exp_doc_fk,
            nacionalidad_fk,
            estado_civil_fk,
            centro_costo_fk,
            lugar_trabajo_fk,
            cargo_fk,
            tipo_contrato_fk,
            tipo_tiempo_fk,
            fecha_ingreso,
            jefe_directo_fk,
            estado_contrato_fk,
            salario_fk,
            aux_movilidad_fk,
            correo_electronico,
            direccion,
            telefono_fijo,
            celular,
            estudios_fk,
            banco_fk,
            tipo_cuenta_fk,
            num_cuenta,
            eps_fk,
            arl_fk,
            riesgo,
            pension_fk,
            cesantias_fk,
            ccf_fk,
            contacto_emergencia,
            tel_contacto_emergencia,
            talla_camisa_fk,
            talla_pantalon_fk,
            talla_calzado_fk,
            empresa_fk,
            src_fotografia
        }).catch((err)=>{
            res.json({error:'Error al crear', err:err})
        })

        let contra = bcrypt.hashSync(empleadoCreado.numero_identificacion, 10)

        await CredencialModel.create({
            nombre_usuario: empleadoCreado.numero_identificacion,
            contraseña: contra,
            usuario_fk: empleadoCreado.id_empleado
        }).catch(err=>{
            res.json({texto:'error al crear en:'+ empleadoCreado.id_empleado, err})
        })

        res.json("Creado con exito")

    },

    update: async(req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }
        const {
            tipo_identificacion_fk,
            numero_identificacion,
            nombres,
            apellidos,
            genero,
            fecha_nacimiento,
            lugar_nacimiento_fk,
            fecha_expedicion_doc,
            lugar_exp_doc_fk,
            nacionalidad_fk,
            estado_civil_fk,
            centro_costo_fk,
            lugar_trabajo_fk,
            cargo_fk,
            tipo_contrato_fk,
            tipo_tiempo_fk,
            fecha_ingreso,
            jefe_directo_fk,
            estado_contrato_fk,
            salario_fk,
            aux_movilidad_fk,
            correo_electronico,
            direccion,
            telefono_fijo,
            celular,
            estudios_fk,
            banco_fk,
            tipo_cuenta_fk,
            num_cuenta,
            eps_fk,
            arl_fk,
            riesgo,
            pension_fk,
            cesantias_fk,
            ccf_fk,
            contacto_emergencia,
            tel_contacto_emergencia,
            talla_camisa_fk,
            talla_pantalon_fk,
            talla_calzado_fk,
            empresa_fk,
            src_fotografia,
        } = req.body
        await EmpleadoModel.update({
            tipo_identificacion_fk,
            numero_identificacion,
            nombres,
            apellidos,
            genero,
            fecha_nacimiento,
            lugar_nacimiento_fk,
            fecha_expedicion_doc,
            lugar_exp_doc_fk,
            nacionalidad_fk,
            estado_civil_fk,
            centro_costo_fk,
            lugar_trabajo_fk,
            cargo_fk,
            tipo_contrato_fk,
            tipo_tiempo_fk,
            fecha_ingreso,
            jefe_directo_fk,
            estado_contrato_fk,
            salario_fk,
            aux_movilidad_fk,
            correo_electronico,
            direccion,
            telefono_fijo,
            celular,
            estudios_fk,
            banco_fk,
            tipo_cuenta_fk,
            num_cuenta,
            eps_fk,
            arl_fk,
            riesgo,
            pension_fk,
            cesantias_fk,
            ccf_fk,
            contacto_emergencia,
            tel_contacto_emergencia,
            talla_camisa_fk,
            talla_pantalon_fk,
            talla_calzado_fk,
            empresa_fk,
            src_fotografia
        },{
            where:{ id_empleado:req.params.id}
        }).catch(()=>{
            res.json('Error al actualizar')
        })
        res.json("Actualizado con exito")
    },

    disable: async(req, res)=>{
        await EmpleadoModel.update({
            estado: 0
        },{
            where:{ id_empleado:req.params.id}
        }).catch(()=>{
            res.json('Error al inactivar')
        })
        res.json("Inactivado con exito")
    },

    enable: async(req, res)=>{
        await EmpleadoModel.update({
            estado: 1
        },{
            where:{ id_empleado:req.params.id}
        }).catch(()=>{
            res.json('Error al activar')
        })
        res.json("Activado con exito")
    },

    listNuevosEmpleados:async(_req, res)=>{
        const items = await EmpleadoModel.findAll({ attributes:[ 'id_empleado', 'nombres', 'fecha_ingreso'], include:[{model:EmpresaModel,attributes:['nombre_empresa']},{model:CentroCostoModel,attributes:['nombre_centro_costo']}], order:[['fecha_ingreso', 'DESC']], limit:30 })
        res.json(items)
    },

    listDataCard: async(_req, res)=>{
        const data1 = {
            usuarios: await EmpleadoModel.count(),
            soporte: await EmpleadoModel.count({where:{tipo_usuario_fk:1}}),
            admin: await EmpleadoModel.count({where:{tipo_usuario_fk:2}})
        }

        await sequelize.query('select id_ciudad, nombre_ciudad, COUNT(*) as total_empleados from ciudad INNER JOIN empleado on lugar_trabajo_fk = id_ciudad GROUP BY id_ciudad ORDER BY total_empleados DESC').then(async(ciudades)=>{
            const mayorPorCiudad = []

            let item = await sequelize.query(`select nombre_ciudad, nombre_centro_costo,COUNT(*) total_empleados from ciudad INNER JOIN centro_costo on id_ciudad_fk = id_ciudad INNER JOIN empleado on centro_costo_fk = id_centro_costo WHERE id_ciudad = ${ciudades[0][0].id_ciudad} GROUP BY id_centro_costo ORDER BY total_empleados DESC LIMIT 1`)
            mayorPorCiudad.push(item[0][0])
            item = await sequelize.query(`select nombre_ciudad, nombre_centro_costo,COUNT(*) total_empleados from ciudad INNER JOIN centro_costo on id_ciudad_fk = id_ciudad INNER JOIN empleado on centro_costo_fk = id_centro_costo WHERE id_ciudad = ${ciudades[0][1].id_ciudad} GROUP BY id_centro_costo ORDER BY total_empleados DESC LIMIT 1`)
            mayorPorCiudad.push(item[0][0])
            item = await sequelize.query(`select nombre_ciudad, nombre_centro_costo,COUNT(*) total_empleados from ciudad INNER JOIN centro_costo on id_ciudad_fk = id_ciudad INNER JOIN empleado on centro_costo_fk = id_centro_costo WHERE id_ciudad = ${ciudades[0][2].id_ciudad} GROUP BY id_centro_costo ORDER BY total_empleados DESC LIMIT 1`)
            mayorPorCiudad.push(item[0][0])

            ciudades[0].forEach((el,id) => {
                if(id<2){
                    mayorPorCiudad[id].total_empleados_ciudad = el.total_empleados
                }
            });

            res.json({card1:data1, card2:mayorPorCiudad, card3:ciudades[0]})
    
        })
   
    },

    dataEmpleadosEmpresa: async(req,res)=>{
        const porcentajes = await sequelize.query('SELECT nombre_empresa, (COUNT(*)*100/(SELECT COUNT(*) FROM empleado))porcentaje, COUNT(*) total_empleados FROM empleado INNER JOIN empresa on empresa_fk = id_empresa GROUP BY id_empresa ORDER BY porcentaje DESC')
        res.json(porcentajes[0])
    },
    
    genReporte: async(req,res)=>{
        const {campos, foraneas, ciudad, condiciones, montos, jefe_directo} = req.body
        let campo = ''
        let inners = ''
        let condicion = ''

        campos.forEach(el => {
            campo += ` emp1.${el},`
        });

        foraneas.forEach(el => {
            campo += Array.isArray(el)?` nombre_${el[2]} ${el[2]},`:` nombre_${el} ${el},`
            inners += Array.isArray(el)?` inner join ${el[0]} on id_${el[2]} = emp1.${el[1]}_fk`:` inner join ${el} on id_${el} = emp1.${el}_fk`
        });

        ciudad.forEach(el => {
            campo += ` ${el}.nombre_ciudad ${el},`
            inners += ` left join ciudad ${el} on ${el}.id_ciudad = emp1.${el}_fk`
        });

        montos.forEach(el => {
            campo += ` monto_${el} ${el},`
            inners += ` inner join ${el} on id_${el} = emp1.${el}_fk`
        });

        if(jefe_directo===true) {
            campo += ` emp2.nombres jefe_directo,`
            inners += ` inner join empleado emp2 on emp2.id_empleado = emp1.jefe_directo_fk`
        }

        if (condiciones) {
            condiciones.forEach((el, id) => {
                if(id===0){
                    condicion += 'where '
                }else{
                    condicion += ' and '
                }
                condicion += `emp1.${el.campo}_fk = ${el.valor}`
            });    
        }

        campo =campo.substring(0, campo.length - 1);
        const sql = await sequelize.query(`select${campo} from empleado emp1 ${inners} ${condicion}`) 
        res.json(sql[0])
    }

}
module.exports = Controller 
