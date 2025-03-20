import React from "react";
import { NextSeo } from "next-seo";
import SidebarLayout from "layout/Sidebar";
import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import World from "../components/World";
import WorldAddFormStep from "components/WorldAddFrom/WorldAddFormStep";
import StepFeatureForm from "components/WorldAddFrom/StepFeatureFrom";
import StepWorldForm from "components/WorldAddFrom/StepWorldForm";
import WorldAddForm from "components/WorldAddFrom";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: "8px",
  },
  paper: {
    padding: "8px",
    textAlign: "center",
    color: "#19857b",
  },
  world: {
    color: "#19857b",
  },
  infoBlock: {
    display: "flex",
    flexDirection: "column",
    marginTop: "8px",
    marginBottom: "8px",
  },
  info: {
    display: "block",
    marginBottom: "4px",
    borderBottom: "1px dotted #ccc",
    "&::after": {
      content: "''",
      width: "100%",
      display: "table",
      clear: "both",
    },
    "& > i:nth-child(1)": {
      display: "block",
      float: "left",
    },
    "& > i:nth-child(2)": {
      display: "block",
      float: "right",
    },
  },
}));

const AddWorld = ({ chroniclesForm, labelsForm }) => {
  const classes = useStyles();

  const SEO = {
    title: "Добавить новый сервер L2 в анонсы",
    description:
      "Добавить сервер л2 на анонсы серверов линейдж. Сервера lineage всех хроник и рейтов в одном месте.",

    openGraph: {
      title: "Добавить новый сервер L2 в анонсы",
      description:
        "Добавить сервер л2 на анонсы серверов линейдж. Сервера lineage всех хроник и рейтов в одном месте.",
    },
  };

  const featureOptions = [
    {
      value: "blue",
      name: "Синий VIP",
      info: "1300 руб / 15 дней",
      advantages: [
        "Мгновенная автоматическая модерация",
        "Самый яркий вариант размещения",
        "Отображается перед Оранжевыми VIP",
      ],
      disadvantages: [],
    },
    {
      value: "orange",
      name: "Оранжевый VIP",
      info: "600 руб / 15 дней",
      advantages: [
        "Мгновенная автоматическая модерация",
        "Размещается в блоке закрепленных",
        "Выделяется среди остальных",
      ],
      disadvantages: ["Размещается после Синих VIPов"],
    },
    {
      value: "normal",
      name: "Обычное размещение",
      info: "Бесплатно",
      advantages: ["Бесплатное размещение"],
      disadvantages: [
        "Ручная проверка модератором в среднем ~ 1 сутки",
        "Никак не отличается среди остальных",
      ],
    },
  ];

  const start = {
    host: "example.com",
    rate: {
      name: "x3",
    },
    chronicle: {
      name: "Interlude",
    },
    date: "21.11.20",
    labels: [],
  };

  return (
    <>
      <NextSeo {...SEO} />
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h5" component="h2">
            Контакты для связи
          </Typography>
        </Grid>
        <Grid container item spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="h6" component="p">
                Telegram
              </Typography>
              <Typography variant="body1" component="p">
                <a href="https://t.me/l2nooru" target="_blank" rel="nofollow">
                  Войти в чат
                </a>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="h6" component="p">
                Skype
              </Typography>
              <Typography variant="body1" component="p">
                <a href="skype:lawemole?chat" target="_blank" rel="nofollow">
                  Войти в чат
                </a>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="h6" component="p">
                VK
              </Typography>
              <Typography variant="body1" component="p">
                <a
                  href="https://vk.com/lineagenoo"
                  target="_blank"
                  rel="nofollow"
                >
                  Алиса Анонсова
                </a>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="h6" component="p">
                Email
              </Typography>
              <Typography variant="body1" component="p">
                <a href="mailto:info@l2noo.ru" target="_blank" rel="nofollow">
                  info@l2noo.ru
                </a>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 16 }}>
          <Box py={2}>
            <WorldAddForm
              initialValues={{
                link: "",
                chronicle: "",
                labels: [],
                rate: "",
                date: null,
                feature: "orange",
              }}
            >
              <WorldAddFormStep
                validationSchema={Yup.object({
                  feature: Yup.string().required(
                    "Обязательно укажите тип размещения"
                  ),
                })}
                label="Тип размещения"
              >
                <StepFeatureForm featureOptions={featureOptions} />
              </WorldAddFormStep>
              <WorldAddFormStep
                label="Информация о открытии"
                validationSchema={Yup.object({
                  link: Yup.string()
                    .url("Введите действующий URL проекта")
                    .required("Введите URL проекта"),
                  chronicle: Yup.string()
                    .uuid("Неверный формат UUID")
                    .required("Выберите хроники проекта"),
                  labels: Yup.array(),
                  rate: Yup.string().required("Введите рейт проекта"),
                  date: Yup.date("Некорректный формат даты").required(
                    "Выберите дату открытия"
                  ),
                })}
              >
                <StepWorldForm
                  chronicleOptions={chroniclesForm.map((chronicle) => ({
                    key: chronicle.name,
                    value: chronicle.chronicleId,
                  }))}
                  labelOptions={labelsForm.map((label) => ({
                    key: label.name,
                    value: label.labelId,
                  }))}
                />
              </WorldAddFormStep>
            </WorldAddForm>
          </Box>
        </Grid>

        <Grid container item>
          <Grid item xs={12}>
            <Typography variant="h6" component="h3">
              Оранжевый VIP
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <World start={{ ...start, feature: { type: "ORANGE" } }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" component="p">
              К вашему анонсу будет добавлена надпись &quot;VIP&quot; на
              оранжевом фоне. Анонс будет размещен во всех блоках, в том числе в
              Закрепленном VIP после Синего VIP.
            </Typography>
          </Grid>
          <Grid item xs={8} className={classes.infoBlock}>
            <Typography
              variant="body2"
              component="span"
              className={classes.info}
            >
              <i>Стоимость размещения (15 дней)</i>
              <i>600 руб</i>
            </Typography>
            <Typography
              variant="body2"
              component="span"
              className={classes.info}
            >
              <i>
                Автоматическая оплата через QIWI и карты (заполните форму выше)
              </i>
            </Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12}>
            <Typography variant="h6" component="h3">
              Синий VIP
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <World start={{ ...start, feature: { type: "BLUE" } }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" component="p">
              К вашему анонсу будет добавлена надпись &quot;VIP&quot; на синем
              фоне. Анонс будет размещен во всех блоках, в том числе в
              Закрепленном VIP перед блоком Оранжевых VIP.
            </Typography>
          </Grid>
          <Grid item xs={8} className={classes.infoBlock}>
            <Typography
              variant="body2"
              component="span"
              className={classes.info}
            >
              <i>Стоимость размещения (15 дней)</i>
              <i>1300 руб</i>
            </Typography>
            <Typography
              variant="body2"
              component="span"
              className={classes.info}
            >
              <i>
                Автоматическая оплата через QIWI и карты (заполните форму выше)
              </i>
            </Typography>
          </Grid>
        </Grid>

        <Grid container item>
          <Grid item xs={12}>
            <Typography variant="h6" component="h3">
              Брендирование
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" component="p">
              Реклама вашего проекта в виде изображения 1920х600 будет размещена
              на фоне сайта. Если у Вас нет дизайна, можем помочь в этом
              вопросе. Допускаются изображения только хорошего качества, не
              более 300 кб.
            </Typography>
          </Grid>
          <Grid item xs={8} className={classes.infoBlock}>
            <Typography
              variant="body2"
              component="span"
              className={classes.info}
            >
              <i>Стоимость размещения (15 дней)</i>
              <i>3000 руб</i>
            </Typography>
            <Typography
              variant="body2"
              component="span"
              className={classes.info}
            >
              <i>
                Для заказа обратитесь к менеджеру, по контатам, указанным в
                начале страницы
              </i>
            </Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12}>
            <Typography variant="h6" component="h3">
              Боковая реклама 240х400
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" component="p">
              Анимационная или статичная картинка будет размешена в блоке
              сортировки серверов. Одновременно доступны 3 места. Картинка
              меняется каждые 5 секунд.
            </Typography>
          </Grid>
          <Grid item xs={8} className={classes.infoBlock}>
            <Typography
              variant="body2"
              component="span"
              className={classes.info}
            >
              <i>Стоимость размещения (15 дней)</i>
              <i>500 руб</i>
            </Typography>
            <Typography
              variant="body2"
              component="span"
              className={classes.info}
            >
              <i>
                Для заказа обратитесь к менеджеру, по контатам, указанным в
                начале страницы
              </i>
            </Typography>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <Typography variant="h5" component="h4" paragraph={true}>
            Код кнопки для размещения на сайте
          </Typography>
          <ul>
            <li>
              Размещение кнопки нашего проекта необязательно, но повышает Вашу
              карму
            </li>
          </ul>
          <Typography component="p">
            <Image
              src="https://l2noo.ru/img/l2noo.png"
              alt="Новые сервера Lineage 2"
            />
          </Typography>
          <textarea
            style={{ width: "100%", maxWidth: 500, height: 100 }}
            defaultValue={
              '<a href="https://l2noo.ru/" style="display:block;width:193px;height:60px;" target="_blank" title="Новые Lineage 2 сервера"><img src="https://l2noo.ru/img/l2noo.png" alt="Новые сервера Lineage 2" border="0"/></a>'
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

AddWorld.Layout = SidebarLayout;

AddWorld.propTypes = {
  chronicles: PropTypes.array,
  labels: PropTypes.array,
};

export async function getStaticProps() {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const [chroniclesData, chroniclesFormData, labelsData, labelsFormData] =
    await Promise.all([
      fetch(
        `${NEXT_PUBLIC_API_URL}/chronicles?filter[show_in_sidebar]=1&sort=sort`
      ).then((r) => r.json()),
      fetch(`${NEXT_PUBLIC_API_URL}/chronicles?sort=name`).then((r) =>
        r.json()
      ),
      fetch(`${NEXT_PUBLIC_API_URL}/labels`).then((r) => r.json()),
      fetch(`${NEXT_PUBLIC_API_URL}/labels?available_for_selection=true`).then(
        (r) => r.json()
      ),
    ]);

  return {
    props: {
      h1: "Добавить новый сервер L2 в анонсы",
      chronicles: chroniclesData,
      chroniclesForm: chroniclesFormData,
      labels: labelsData,
      labelsForm: labelsFormData,
    },
  };
}

export default AddWorld;
