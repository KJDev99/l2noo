import React from "react";
import { NextSeo } from "next-seo";
// import SidebarLayout from "layout/Sidebar";
import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import WorldAddForm from "@/components/WorldAddFrom";
import StepFeatureForm from "@/components/WorldAddFrom/StepFeatureFrom";
import WorldAddFormStep from "@/components/WorldAddFrom/WorldAddFormStep";
import StepWorldForm from "@/components/WorldAddFrom/StepWorldForm";
import World from "../components/World";
import * as Yup from "yup";
import SidebarLayout from "@/layout/Sidebar";

const SEO = {
  title: "Добавить новый сервер L2 в анонсы",
  description: "Добавить сервер л2 на анонсы серверов линейдж.",
  openGraph: {
    title: "Добавить новый сервер L2 в анонсы",
    description: "Добавить сервер л2 на анонсы серверов линейдж.",
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
      "Ручная проверка модератором ~ 1 сутки",
      "Никак не отличается среди остальных",
    ],
  },
];

const start = {
  host: "example.com",
  rate: { name: "x3" },
  chronicle: { name: "Interlude" },
  date: "21.11.20",
  labels: [],
};

const ContactInfo = ({ title, link, text }) => (
  <Grid item xs={6} sm={3}>
    <Paper variant="outlined" style={{ padding: 16, textAlign: "center" }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">
        <a href={link} target="_blank" rel="nofollow">
          {text}
        </a>
      </Typography>
    </Paper>
  </Grid>
);

const AddWorld = ({ chroniclesForm, labelsForm }) => (
  <>
    <NextSeo {...SEO} />
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Контакты для связи</Typography>
      </Grid>
      <Grid container item spacing={3}>
        <ContactInfo
          title="Telegram"
          link="https://t.me/l2nooru"
          text="Войти в чат"
        />
        <ContactInfo
          title="Skype"
          link="skype:lawemole?chat"
          text="Войти в чат"
        />
        <ContactInfo
          title="VK"
          link="https://vk.com/lineagenoo"
          text="Алиса Анонсова"
        />
        <ContactInfo
          title="Email"
          link="mailto:info@l2noo.ru"
          text="info@l2noo.ru"
        />
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
              label="Тип размещения"
              validationSchema={Yup.object({
                feature: Yup.string().required(
                  "Обязательно укажите тип размещения"
                ),
              })}
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
                chronicleOptions={chroniclesForm.map(
                  ({ name, chronicleId }) => ({ key: name, value: chronicleId })
                )}
                labelOptions={labelsForm.map(({ name, labelId }) => ({
                  key: name,
                  value: labelId,
                }))}
              />
            </WorldAddFormStep>
          </WorldAddForm>
        </Box>
      </Grid>
      {[
        { type: "ORANGE", title: "Оранжевый VIP", price: "600 руб" },
        { type: "BLUE", title: "Синий VIP", price: "1300 руб" },
      ].map(({ type, title, price }) => (
        <Grid container item key={type}>
          <Grid item xs={12}>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <World start={{ ...start, feature: { type } }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Описание {title}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              <i>Стоимость размещения (15 дней)</i> <i>{price}</i>
            </Typography>
            <Typography variant="body2">
              <i>Автоматическая оплата через QIWI и карты</i>
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </>
);

AddWorld.Layout = SidebarLayout;
AddWorld.propTypes = {
  chroniclesForm: PropTypes.array,
  labelsForm: PropTypes.array,
};

export async function getStaticProps() {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const [chroniclesData, chroniclesFormData, labelsData, labelsFormData] =
    await Promise.all([
      fetch(
        `${NEXT_PUBLIC_API_URL}/chronicles?filter[show_in_sidebar]=1&sort=sort`
      ).then((res) => res.json()),
      fetch(`${NEXT_PUBLIC_API_URL}/chronicles?sort=name`).then((res) =>
        res.json()
      ),
      fetch(`${NEXT_PUBLIC_API_URL}/labels`).then((res) => res.json()),
      fetch(`${NEXT_PUBLIC_API_URL}/labels?available_for_selection=true`).then(
        (res) => res.json()
      ),
    ]);
  return {
    props: { chroniclesForm: chroniclesFormData, labelsForm: labelsFormData },
  };
}

export default AddWorld;
